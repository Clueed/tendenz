import { PrismaClient } from '@prisma/client'
import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient
	}
}

const prismaPlugin: FastifyPluginAsync = fp(async server => {
	const prisma = new PrismaClient({
		log: [
			'error',
			'warn',
			// { emit: 'event', level: 'query' }
		],
	})
	// prisma.$on('query', async e => {
	// 	server.log.info(`${e.query} ${e.params}`)
	// })

	await prisma.$connect()
	server.log.info('Connecting Prsima to db')

	server.decorate('prisma', prisma)

	server.addHook('onClose', async server => {
		server.log.info('disconnecting Prisma from DB')
		await server.prisma.$disconnect()
	})
})

export default prismaPlugin
