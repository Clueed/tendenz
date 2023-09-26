import { stockTypeCode, stockTypes } from '@tendenz/types'

export function formatName(name: string, type: stockTypeCode) {
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
