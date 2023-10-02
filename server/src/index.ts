import cors from '@fastify/cors'
import { Prisma } from '@prisma/client'
import {
	stockTypeCode,
	stockTypes,
	tendenzApiSigmaYesterday,
	tendenzApiSigmaYesterdayV0,
} from '@tendenz/types'
import Bree from 'bree'
import Fastify from 'fastify'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SHARE_ENV } from 'node:worker_threads'
import { DatabaseApi } from './lib/databaseApi/databaseApi.js'
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

fastify.get('/us-stocks/daily/:page', async request => {
	const db = new DatabaseApi(fastify.prisma)
	const query = request.query as Query
	const marketCap = {
		min: Number(query?.minMarketCap) || undefined,
		max: Number(query?.maxMarketCap) || undefined,
	}

	const types =
		typeof query.type === 'string'
			? [query.type]
			: Array.isArray(query.type)
			? query.type
			: undefined

	const typesValid = types?.every(type =>
		Object.keys(stockTypes).includes(type),
	)

	if (typesValid === false) {
		throw new Error('Invalid types specified')
	}

	const typesFilter =
		types?.length === Object.keys(stockTypes).length ? undefined : types

	const mostRecentDates = await db.getMostRecentDates(2)

	const params = request.params as Params
	const page = Number(params?.page) || 0

	const today = await db.getToday(
		page,
		mostRecentDates[0],
		marketCap.min,
		marketCap.max,
		typesFilter as stockTypeCode[] | undefined,
		10,
	)

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

			const cleanName = formatName(name, type as stockTypeCode)

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

	return response
})

function formatName(name: string, type: stockTypeCode) {
	const simpleReplace: stockTypeCode[] = ['ETF', 'ETN', 'ETS', 'ETV', 'CS']

	const nameRegex = stockTypes[type].aliases
		.map(n => n.replace(' ', '[- ]'))
		.join('|')

	if (simpleReplace.includes(type)) {
		const regEx = new RegExp(`${type}|${nameRegex}`, 'gi')
		return name.replace(regEx, '').trim()
	}

	return name
}

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

	const response: tendenzApiSigmaYesterdayV0[] = sigmaYesterday.map(
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
			lastDate,
			secondLastClose,
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
			last: { close: lastClose, date: lastDate },
			secondLast: {
				close: secondLastClose,
				date: secondLastDate,
			},
		}),
	)

	return response
})

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

export interface Query {
	minMarketCap?: string
	maxMarketCap?: string
	type?: string | string[]
}
export interface Params {
	page?: string
}
