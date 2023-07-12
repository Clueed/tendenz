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
  let startingDateObj: Date;

  if (typeof startingDate === "string") {
    startingDateObj = new Date(Date.parse(startingDate));
  } else {
    startingDateObj = startingDate;
  }

  let errorCounter = 0;

  let daysPast = 0;

  while (true) {
    const targetDate =
      startingDateObj.getTime() - daysPast * 24 * 60 * 60 * 1000;
    const dateString = formatDateString(targetDate);

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
      daysPast++;
      continue;
    }

    const updateCounter = await updateDaily(results, prisma);

    console.info(`Updated ${updateCounter} out of ${results.length} to db`);

    if (endOnNoUpdates && updateCounter === 0) {
      console.info(
        "Ending update cycle because no change in data was detected."
      );
      break;
    }

    daysPast++;
  }
}
