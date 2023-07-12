import { PrismaClient } from "@prisma/client";
import { IAggsResults } from "./polygonApi/aggregatesGroupedDaily.js";
import { allDailysOnDate, formatDateString } from "./misc.js";

export async function updateDaily(
  results: IAggsResults[],
  prisma: PrismaClient
): Promise<false | number> {
  const allTickersAtDate = await allDailysOnDate(results[0].t, prisma);

  let counter: number = 0;

  for (const result of results) {
    const { T, t: timestamp, ...data } = result;
    const t = new Date(timestamp);
    const dateString = formatDateString(t);

    if (allTickersAtDate.includes(T)) {
      console.debug(
        `Record already exists for ${T} on ${dateString}. Skipping...`
      );
      continue;
    }

    await prisma.usStockDaily.create({
      data: {
        t,
        ...data,
        UsStocks: {
          connectOrCreate: {
            where: { T },
            create: { T },
          },
        },
      },
    });

    console.info(`Added ${T} on ${dateString} to db`);
    counter++;
  }

  return counter;
}
