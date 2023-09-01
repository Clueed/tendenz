import cors from '@fastify/cors'
import { Prisma } from '@prisma/client'
import { tendenzApiSigmaYesterday } from '@tendenz/types'
import Bree from 'bree'
import Fastify from 'fastify'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseApi } from './lib/databaseApi/databaseApi.js'
import prismaPlugin from './plugins/prisma.js'

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

const PAGE_SIZE = 10

fastify.get('/us-stocks/daily/:page', async request => {
	const db = new DatabaseApi(fastify.prisma)
	const query = request.query as Query
	const minMarketCap = Number(query?.minMarketCap) || undefined

	const mostRecentDates = await db.getMostRecentDates(2)

	const params = request.params as Params
	const page = Number(params?.page) || 0
	const skip = page * PAGE_SIZE

	const today = await fastify.prisma.usStockDaily.findMany({
		orderBy: {
			sigmaAbs: 'desc',
		},
		where: {
			marketCap: { gte: minMarketCap } || { not: null },
			date: mostRecentDates[0],
			UsStocks: {
				name: { not: null },
			},
			sigmaAbs: { not: null },
		},
		take: PAGE_SIZE,
		skip,
		select: {
			close: true,
			ticker: true,
			sigma: true,
			date: true,
			marketCap: true,
			UsStocks: {
				select: {
					name: true,
				},
			},
		},
	})

	const tickers = today.map(value => value.ticker)

	const yesterday = await fastify.prisma.usStockDaily.findMany({
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

	const response = today.map(
		({ ticker, close, date, UsStocks: { name }, ...rest }) => {
			const previous = yesterday.find(prev => prev.ticker === ticker)

			if (!previous) {
				throw new Error(`${ticker} has no yesterday value`)
			}

			return {
				...rest,
				ticker,
				name,
				last: {
					close: close,
					date: date,
				},
				secondLast: { close: previous.close, date: previous.date },
			}
		},
	)

	return response
})

fastify.get('/:page', async request => {
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

export interface Query {
	minMarketCap?: string
}
export interface Params {
	page?: string
}
