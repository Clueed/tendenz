import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { timeout } from '../misc.js'

// TODO: handle retry on error - especially rate limit

export class PolygonApi {
	axiosInstance: AxiosInstance
	lastRequest: number | false = false
	requestPerMinute: number
	requestPerMillisecond: number

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: 'https://api.polygon.io/',
			timeout: 10000,
		})

		this.requestPerMinute = 5
		this.requestPerMillisecond = (60 * 1000) / this.requestPerMinute
	}

	async get(
		inputUrl: string,
		apiKeyNumber: 1 | 2 = 1,
	): Promise<AxiosResponse<any, any>> {
		let apiKey: string | undefined

		if (apiKeyNumber === 1) {
			apiKey = process.env.POLYGON_API_KEY1
		} else if (apiKeyNumber === 2) {
			apiKey = process.env.POLYGON_API_KEY2
		}

		if (!apiKey) {
			throw new Error('Polygon API key not found')
		}

		const url = inputUrl + `&apiKey=${apiKey}`

		if (this.lastRequest === false) {
			this.lastRequest = Date.now()
			return this.axiosInstance.get(url)
		}

		const sinceLastRequest = Date.now() - this.lastRequest
		const tillNextRequest = this.requestPerMillisecond - sinceLastRequest

		if (tillNextRequest > 0) {
			console.debug('[RL] Waiting for', tillNextRequest, 'ms')
			await timeout(tillNextRequest)
			return this.get(url)
		}

		this.lastRequest = Date.now()

		const res = await this.axiosInstance.get(url)

		if (res.status === 429) {
			console.warn('Hit rate limit. Retrying...')
			return this.get(inputUrl, apiKeyNumber)
		}

		return res
	}
}
