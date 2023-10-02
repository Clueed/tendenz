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
} from 'fastify'
import fp from 'fastify-plugin'
import { GenericRouteType } from './routeTypes.js'

export type UsStocksDailyRouteType = GenericRouteType<{
	Querystring: UsStocksDailyQueryType
	Params: UsStocksDailyParamsType
	Reply: tendenzApiSigmaYesterday[]
}>

export function constructUsStocksDailyRoute(
	handleRequest: UsStocksDailyRouteType['RequestHandler'],
) {
	const UsStocksDailyRoute: FastifyPluginAsync = fp(
		async (server: FastifyInstance, options: FastifyPluginOptions) => {
			server.get<UsStocksDailyRouteType['RouteInterface']>(
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
