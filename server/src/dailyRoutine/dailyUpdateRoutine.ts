import { timeout } from "../misc.js";
import { polygon, prisma } from "../populate_db.js";
import { reverseIncrementDailyUpdate } from "./reverseIncrementDailyUpdate.js";

export async function dailyUpdateRoutine() {
  while (true) {
    const updateCounter = await reverseIncrementDailyUpdate(
      polygon,
      prisma,
      true
    );

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

    console.info(`Trying again in 1 hour...`);
    await timeout(1000 * 60 * 60);
  }
}
