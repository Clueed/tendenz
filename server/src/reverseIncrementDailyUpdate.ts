import { PrismaClient } from "@prisma/client";
import { PolygonApi } from "./polygonApi/polygonApi.js";
import { updateDaily } from "./updateDaily.js";
import { formatDateString } from "./misc.js";
import { aggregatesGroupedDaily } from "./polygonApi/aggregatesGroupedDaily.js";

export async function reverseIncrementDailyUpdate(
  polygon: PolygonApi,
  prisma: PrismaClient,
  endOnNoUpdates: boolean = false,
  startingDate: string | Date = new Date()
): Promise<void> {
  console.group(`Initiating daily market update cycle`);
  let startingDateObj: Date;

  if (typeof startingDate === "string") {
    startingDateObj = new Date(Date.parse(startingDate));
  } else {
    startingDateObj = startingDate;
  }

  let errorCounter: number = 0;

  let daysPast: number = 0;

  while (true) {
    const targetDate =
      startingDateObj.getTime() - daysPast * 24 * 60 * 60 * 1000;
    const dateString = formatDateString(targetDate);
    console.group(`Updating ${dateString}`);

    const results = await aggregatesGroupedDaily(polygon, dateString);

    if (!results) {
      errorCounter++;

      if (errorCounter === 5) {
        daysPast++;
      }

      if (errorCounter >= 10) {
        break;
      }

      continue;
    }

    if (results.length === 0) {
      console.info(`No data available.`);
      console.groupEnd();
      continue;
    }

    const updateCounter = await updateDaily(results, prisma);

    console.info(`Updated ${updateCounter} out of ${results.length} on disk`);

    if (endOnNoUpdates && updateCounter === 0) {
      console.groupEnd();
      console.info("Ending update cycle. No new data available.");
      break;
    }

    console.groupEnd();
    daysPast++;
  }
  console.groupEnd();
}
