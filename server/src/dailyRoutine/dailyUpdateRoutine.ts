import { timeout } from "../misc.js";
import { reverseIncrementDailyUpdate } from "./reverseIncrementDailyUpdate.js";

export async function dailyUpdateRoutine(retryHours: number = 0) {
  while (true) {
    const updateCounter = await reverseIncrementDailyUpdate(true);

    if (Object.keys(updateCounter).length === 0) {
      return false;
    }

    const updateCounts = Object.values(updateCounter);
    const updated = updateCounts.some((count) => count !== 0);

    if (updated) {
      console.info("Daily update complete:");
      for (const key in updateCounter) {
        console.info(`${key}: ${updateCounter[key]}`);
      }
      return true;
    }

    return false;

    if (retryHours > 0) {
      console.info(`Trying again in ${retryHours} hour...`);
      await timeout(1000 * 60 * 60 * retryHours);
    }
  }
}
