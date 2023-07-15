import { PrismaClient } from "@prisma/client";
import { PolygonApi } from "../polygonApi/polygonApi.js";
import { updateDaily } from "./updateDaily.js";
import { formatDateString } from "../misc.js";
import { aggregatesGroupedDaily } from "../polygonApi/aggregatesGroupedDaily.js";

interface UpdateCounter {
  [key: string]: number;
}

export async function reverseIncrementDailyUpdate(
  endOnNoUpdates: boolean = true,
  startingDate: string | Date = new Date()
): Promise<UpdateCounter> {
  let startingDateObj: Date;

  if (typeof startingDate === "string") {
    startingDateObj = new Date(Date.parse(startingDate));
  } else {
    startingDateObj = startingDate;
  }

  let errorCounter: number = 0;

  let daysPast: number = 0;

  let updateCounter: UpdateCounter = {};

  while (true) {
    const targetDate =
      startingDateObj.getTime() - daysPast * 24 * 60 * 60 * 1000;
    const dateString = formatDateString(targetDate);
    console.group(`Updating ${dateString}`);

    const results = await aggregatesGroupedDaily(dateString);

    if (results === false) {
      errorCounter++;

      if (errorCounter === 5) {
        daysPast++;
      }

      if (errorCounter >= 10) {
        break;
      }

      continue;
    }

    if (results.length > 0) {
      updateCounter[dateString] = await updateDaily(results);

      if (endOnNoUpdates && updateCounter[dateString] === 0) {
        console.info("Ending update cycle. No new data available.");
        break;
      }
    } else {
      console.info(`No data available.`);
    }

    console.groupEnd();
    daysPast++;
  }

  return updateCounter;
}
