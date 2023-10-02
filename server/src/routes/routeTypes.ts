import { tendenzApiSigmaYesterday } from '@tendenz/types'
import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	FastifySchema,
	FastifyTypeProviderDefault,
	RawServerDefault,
	RouteGenericInterface,
} from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'

export type GenericHandleRequest<
	TServer extends FastifyInstance,
	TRequest extends FastifyRequest,
	TReply extends FastifyReply,
> = (server: TServer, request: TRequest, reply: TReply) => Promise<void>

export interface GenericRouteType<A extends RouteGenericInterface> {
	RouteInterface: A
	Request: FastifyRequest<GenericRouteType<A>['RouteInterface']>
	Reply: FastifyReply<
		RawServerDefault,
		IncomingMessage,
		ServerResponse<IncomingMessage>,
		A,
		unknown,
		FastifySchema,
		FastifyTypeProviderDefault,
		tendenzApiSigmaYesterday[]
	>
	RequestHandler: GenericHandleRequest<
		FastifyInstance,
		GenericRouteType<A>['Request'],
		GenericRouteType<A>['Reply']
	>
}
