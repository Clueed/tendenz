import { updateDaily } from "./updateDaily.js";
import { formatDateString } from "../misc.js";
import { aggregatesGroupedDaily } from "../polygonApi/aggregatesGroupedDaily.js";

interface UpdateStatus {
  updated: number;
  queryCount: number;
  date: string;
}

export async function reverseIncrementDailyUpdate(
  endOnNoUpdates: boolean = true
): Promise<UpdateStatus[]> {
  let stats: UpdateStatus[] = [];

  let daysPast: number = 0;
  const startingDate = new Date();

  while (true) {
    const targetDate = startingDate.getTime() - daysPast * 24 * 60 * 60 * 1000;
    const dateString = formatDateString(targetDate);
    console.group(`Updating ${dateString}`);

    const results = await aggregatesGroupedDaily(dateString);

    let updateCount: number = 0;

    if (results.length > 0) {
      updateCount = await updateDaily(results);
    } else {
      console.info("Not data available.");
      updateCount = 0;
    }

    stats.push({
      updated: updateCount,
      queryCount: results.length,
      date: dateString,
    });

    console.groupEnd();
    daysPast++;

    const queryCounts = stats.reverse().map((day) => day.queryCount);
    if (consecutiveZeros(queryCounts) > 6) {
      // API error or more than 2 years back
      break;
    }

    const updatedDays = stats.reverse().map((day) => day.updated);
    if (endOnNoUpdates && consecutiveZeros(updatedDays) >= 5) {
      break;
    }
  }

  return stats;
}

function consecutiveZeros(array: number[]) {
  let zeros = 0;

  for (const i of array) {
    if (i === 0) {
      zeros++;
    } else {
      break;
    }
  }

  return zeros;
}
