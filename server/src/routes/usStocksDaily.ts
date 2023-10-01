import {
	UsStocksDailyParamsType,
	UsStocksDailyQueryType,
	tendenzApiSigmaYesterday,
	usStocksDailyParamsSchema,
	usStocksDailyQuerySchema,
} from '@tendenz/types'
import {
	FastifyInstance,
	FastifyPluginAsync,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
	FastifySchema,
	RawServerDefault,
	RouteGenericInterface,
} from 'fastify'
import fp from 'fastify-plugin'
import { FastifyTypeProviderDefault } from 'fastify/types/type-provider.js'
import { IncomingMessage, ServerResponse } from 'http'
import { formatName } from '../lib/api/formatName.js'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'

export interface UsStocksDailyRouteGenericInterface
	extends RouteGenericInterface {
	Querystring: UsStocksDailyQueryType
	Params: UsStocksDailyParamsType
	Reply: tendenzApiSigmaYesterday[]
}

export type UsStocksDailyRouteRequest =
	FastifyRequest<UsStocksDailyRouteGenericInterface>

export type UsStocksDailyRouteReply = FastifyReply<
	RawServerDefault,
	IncomingMessage,
	ServerResponse<IncomingMessage>,
	UsStocksDailyRouteGenericInterface,
	unknown,
	FastifySchema,
	FastifyTypeProviderDefault,
	tendenzApiSigmaYesterday[]
>

export type GenericRequestHandler<
	TServer extends FastifyInstance,
	TRequest extends FastifyRequest,
	TReply extends FastifyReply,
> = (server: TServer, request: TRequest, reply: TReply) => Promise<void>

export type UsStocksDailyRequestHandler = GenericRequestHandler<
	FastifyInstance,
	UsStocksDailyRouteRequest,
	UsStocksDailyRouteReply
>

export function constructUsStocksDailyRoute(
	handleRequest: UsStocksDailyRequestHandler,
) {
	const UsStocksDailyRoute: FastifyPluginAsync = fp(
		async (server: FastifyInstance, options: FastifyPluginOptions) => {
			server.get<UsStocksDailyRouteGenericInterface>(
				'/test/us-stocks/daily/:page',
				{
					preValidation(request, _, done) {
						// if (typeof request.query.stockTypes === 'undefined')
						// 	request.query.stockTypes = []
						if (
							typeof request.query.stockTypes !== 'undefined' &&
							!Array.isArray(request.query.stockTypes)
						)
							request.query.stockTypes = [request.query.stockTypes]

						done()
					},
					schema: {
						querystring: usStocksDailyQuerySchema,
						params: usStocksDailyParamsSchema,
					},
				},
				async (request, response) =>
					await handleRequest(server, request, response),
			)
		},
	)

	return UsStocksDailyRoute
}

const handleUsStocksDailyRequest: GenericRequestHandler<
	FastifyInstance,
	UsStocksDailyRouteRequest,
	UsStocksDailyRouteReply
> = async (server, request, reply) => {
	try {
		const { page } = request.params

		const { minMarketCap, maxMarketCap, stockTypes } = request.query

		const db = new DatabaseApi(server.prisma)
		const mostRecentDates = await db.getMostRecentDates(2)

		const today = await db.getToday(
			page,
			mostRecentDates[0],
			minMarketCap,
			maxMarketCap,
			stockTypes,
		)

		const tickers = today.map(value => value.ticker)

		const yesterday = await server.prisma.usStockDaily.findMany({
			where: {
				date: mostRecentDates[1],
				ticker: { in: tickers },
			},
			select: {
				close: true,
				ticker: true,
				date: true,
			},
		})

		const response: tendenzApiSigmaYesterday[] = today.map(
			({
				ticker,
				close,
				date,
				UsStocks: { name, type, primaryExchange },
				marketCap,
				...rest
			}) => {
				const previous = yesterday.find(prev => prev.ticker === ticker)

				if (!previous) {
					throw new Error(`${ticker} has no yesterday value`)
				}

				const cleanName = formatName(name, type)

				return {
					...rest,
					marketCap,
					ticker,
					name: cleanName,
					type,
					primaryExchange,
					last: {
						close: close,
						date: date,
					},
					secondLast: { close: previous.close, date: previous.date },
				}
			},
		)

		return reply.code(200).send(response)
	} catch (error) {
		request.log.error(error)
		return reply.code(400).send()
	}
}

export const usStocksDailyRoute = constructUsStocksDailyRoute(
	handleUsStocksDailyRequest,
)
