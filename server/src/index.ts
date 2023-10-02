import cors from '@fastify/cors'
import Bree from 'bree'
import Fastify from 'fastify'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SHARE_ENV } from 'node:worker_threads'
import prismaPlugin from './plugins/prisma.js'
import { usStocksDailyRoute } from './routes/routes.js'

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

const fastify = Fastify({
	logger: true,
})

process.on('SIGINT', async () => await fastify.close()) // CTRL+C
process.on('SIGQUIT', async () => await fastify.close()) // Keyboard quit
process.on('SIGTERM', async () => await fastify.close()) // `kill` command

fastify.register(cors, {
	origin: '*',
})

fastify.register(prismaPlugin)
fastify.register(usStocksDailyRoute)

const bree = new Bree({
	worker: { env: SHARE_ENV },
	root: path.join(path.dirname(fileURLToPath(import.meta.url)), 'jobs'),
	jobs: [
		{
			name: 'updateMarket',
			cron: '5 * * * *',
		},
		{
			name: 'updateSupplements',
			//cron: '0 4 * * *',
		},
	],
})

const start = async () => {
	if (process.env.NODE_ENV === 'production') {
		bree.start()
	}
	try {
		await fastify.listen({ port: 3001, host: '0.0.0.0' })
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()
