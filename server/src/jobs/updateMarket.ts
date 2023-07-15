import { dailySigmaRoutine } from "../dailyRoutine/dailySigmaRoutine.js";
import { reverseIncrementDailyUpdate } from "../dailyRoutine/reverseIncrementDailyUpdate.js";

await reverseIncrementDailyUpdate(true);
await dailySigmaRoutine();
