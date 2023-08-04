import { dailySigmaRoutine } from '../dailyRoutine/dailySigmaRoutine.js'
import { reverseIncrementDailyUpdate } from '../dailyRoutine/reverseIncrementDailyUpdate.js'

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

await reverseIncrementDailyUpdate()
await dailySigmaRoutine()
