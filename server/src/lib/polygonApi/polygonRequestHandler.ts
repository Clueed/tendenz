import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as http from 'node:http'
import * as https from 'node:https'
import { timeout } from '../misc.js'
import { RequestHandler } from './stocksApi.js'

// TODO: handle retry on error - especially rate limit

export class PolygonRequestHandler implements RequestHandler {
	private readonly axiosInstance: AxiosInstance
	private readonly requestPerMillisecond: number
	private lastRequest: number | false = false
	private pendingRequests = 0

	constructor(
		private readonly apiKey: string,
		requestPerMinute: number = 5,
		private readonly maxRequestCount = 1,
	) {
		this.requestPerMillisecond = (requestPerMinute / 60) * 1000

		this.axiosInstance = PolygonRequestHandler.createAxiosInstance()

		this.axiosInstance.interceptors.request.use(config => {
			return new Promise(resolve => {
				const interval = setInterval(() => {
					if (this.pendingRequests < this.maxRequestCount) {
						this.pendingRequests++
						clearInterval(interval)
						resolve(config)
					}
				}, this.requestPerMillisecond)
			})
		})

		/**
		 * Axios Response Interceptor
		 */
		this.axiosInstance.interceptors.response.use(
			response => {
				this.pendingRequests = Math.max(0, this.pendingRequests - 1)
				return Promise.resolve(response)
			},
			error => {
				this.pendingRequests = Math.max(0, this.pendingRequests - 1)
				return Promise.reject(error)
			},
		)

		this.requestPerMillisecond = (60 * 1000) / requestPerMinute
	}

	private static createAxiosInstance() {
		return axios.create({
			baseURL: 'https://api.polygon.io/',
			timeout: 60000,

			//keepAlive pools and reuses TCP connections, so it's faster
			httpAgent: new http.Agent({ keepAlive: true }),
			httpsAgent: new https.Agent({ keepAlive: true }),

			//follow up to 10 HTTP 3xx redirects
			maxRedirects: 10,

			//cap the maximum content length we'll accept to 50MBs, just in case
			maxContentLength: 50 * 1000 * 1000,
		})
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
