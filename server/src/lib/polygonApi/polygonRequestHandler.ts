import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { timeout } from '../misc.js'
import { RequestHandler } from './stocksApi.js'

// TODO: handle retry on error - especially rate limit

export class PolygonRequestHandler implements RequestHandler {
	private readonly axiosInstance: AxiosInstance
	private readonly requestPerMillisecond: number
	private readonly apiKey: string | undefined
	private lastRequest: number | false = false

	constructor(apiKey: string | undefined, requestPerMinute: number = 5) {
		this.axiosInstance = axios.create({
			baseURL: 'https://api.polygon.io/',
			timeout: 10000,
		})

		this.requestPerMillisecond = (60 * 1000) / requestPerMinute

		if (!apiKey) {
			throw new Error('Polygon API key not found')
		} else {
			this.apiKey = apiKey
		}
	}

	async get<T>(inputUrl: string): Promise<AxiosResponse<T>> {
		const url = inputUrl + `&apiKey=${this.apiKey}`

		if (this.lastRequest !== false) {
			const sinceLastRequest = Date.now() - this.lastRequest
			const tillNextRequest = this.requestPerMillisecond - sinceLastRequest

			if (tillNextRequest > 0) {
				console.debug('[RL] Waiting for', tillNextRequest, 'ms')
				await timeout(tillNextRequest)
				return this.get<T>(url)
			}
		}
		this.lastRequest = Date.now()
		const res = await this.axiosInstance.get<T>(url)

		if (res.status === 429) {
			console.warn('Hit rate limit. Retrying...')
			return this.get<T>(inputUrl)
		}

		return res
	}
}
