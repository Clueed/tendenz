import { tendenzApiSigmaYesterday } from '@tendenz/types'
import { formatName } from '../lib/api/formatName.js'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { UsStocksDailyRouteType } from './usStocksDaily.js'

export const handleUsStocksDailyRequest: UsStocksDailyRouteType['RequestHandler'] =
	async (server, request, reply) => {
		try {
			const { page } = request.params

			const { minMarketCap, maxMarketCap, type } = request.query

			const db = new DatabaseApi(server.prisma)
			const mostRecentDates = await db.getMostRecentDates(2)

			const today = await db.getToday(
				page,
				mostRecentDates[0],
				minMarketCap,
				maxMarketCap,
				type,
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
