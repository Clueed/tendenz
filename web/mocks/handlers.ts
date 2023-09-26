// src/mocks/handlers.js
import { tendenzApiSigmaYesterday } from '@tendenz/types'
import { rest } from 'msw'

export const handlers = [
	rest.get<tendenzApiSigmaYesterday[]>('/user', (req, res, ctx) => {
		// Check if the user is authenticated in this session
		const isAuthenticated = sessionStorage.getItem('is-authenticated')

		if (!isAuthenticated) {
			// If not authenticated, respond with a 403 error
			return res(
				ctx.status(403),
				ctx.json({
					errorMessage: 'Not authorized',
				}),
			)
		}

		return res(
			ctx.status(200),
			ctx.json({
				username: 'admin',
			}),
		)
	}),
]
