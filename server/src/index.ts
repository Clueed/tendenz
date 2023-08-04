import cors from '@fastify/cors'
import { Prisma } from '@prisma/client'
import Bree from 'bree'
import Fastify from 'fastify'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prismaPlugin from './plugins/prisma.js'

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

const fastify = Fastify({
	logger: true,
})

fastify.register(cors, {
	origin: '*',
})
fastify.register(prismaPlugin)

fastify.get('/:page', async (request, reply) => {
	const query = request.query as Query
	const minMarketCap = Number(query?.minMarketCap)

	const where: Prisma.SigmaUsStocksYesterdayWhereInput = {}
	if (minMarketCap) {
		where.marketCap = {
			gt: minMarketCap,
		}
	}

	const PAGE_SIZE = 10
	const params = request.params as Params
	const page = Number(params?.page) || 0
	const skip = page * PAGE_SIZE

	const sigmaYesterday = await fastify.prisma.sigmaUsStocksYesterday.findMany({
		orderBy: {
			absSigma: 'desc',
		},
		where,
		take: PAGE_SIZE,
		skip,
	})

	const response: tendenzApiSigmaYesterday[] = sigmaYesterday.map(
		({
			ticker,
			name,
			sigma,
			absSigma,
			weight,
			marketCap,
			stdLogReturn,
			meanLogReturn,
			sampleSize,
			lastClose,
			lastLogReturn,
			lastDate,
			secondLastClose,
			secondLastLogReturn,
			secondLastDate,
		}) => ({
			ticker,
			name,
			sigma,
			absSigma,
			weight,
			marketCap,
			stdLogReturn,
			meanLogReturn,
			sampleSize,
			last: { close: lastClose, logReturn: lastLogReturn, date: lastDate },
			secondLast: {
				close: secondLastClose,
				logReturn: secondLastLogReturn,
				date: secondLastDate,
			},
		}),
	)

	return response
})

const bree = new Bree({
	root: path.join(path.dirname(fileURLToPath(import.meta.url)), 'jobs'),
	jobs: [
		{
			name: 'updateMarket',
			cron: '5 * * * *',
		},
		{
			name: 'updateSupplements',
			cron: '0 4 * * *',
		},
	],
})

const start = async () => {
	bree.start()
	try {
		await fastify.listen({ port: 3000, host: '0.0.0.0' })
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()

export interface Query {
	minMarketCap?: string
}
export interface Params {
	page?: string
}

export interface tendenzApiSigmaYesterdayDay {
	close: number
	logReturn: number
	date: Date
}

export interface tendenzApiSigmaYesterday {
	ticker: string
	name: string | null
	sigma: number
	absSigma: number
	weight: number
	marketCap: number
	stdLogReturn: number
	meanLogReturn: number
	sampleSize: number
	last: tendenzApiSigmaYesterdayDay
	secondLast: tendenzApiSigmaYesterdayDay
}
