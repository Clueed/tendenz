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
	url: string,
	handleRequest: UsStocksDailyRouteType['RequestHandler'],
) {
	const UsStocksDailyRoute: FastifyPluginAsync = fp(
		async (server: FastifyInstance, options: FastifyPluginOptions) => {
			server.get<UsStocksDailyRouteType['RouteInterface']>(
				url,
				{
					preValidation(request, _, done) {
						// if (typeof request.query.type === 'undefined')
						// 	request.query.type = []
						if (
							typeof request.query.type !== 'undefined' &&
							!Array.isArray(request.query.type)
						)
							request.query.type = [request.query.type]

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
