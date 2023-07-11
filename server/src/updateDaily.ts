import { PrismaClient } from "@prisma/client";
import { PolygonApi, getDailyMarket } from "./polygonApi.js";
import { AxiosError } from "axios";

/**
 * Updates the daily market data for a given date.
 *
 * @param {string} date - The date for which to update the daily market data Format: YYYY-MM-DD
 * @param {PolygonApi} polygon - The Polygon API instance.
 * @param {PrismaClient} prisma - The Prisma client instance.
 * @return {Promise<void>} A promise that resolves when the update is complete.
 */
export async function updateDaily(
  date: string,
  polygon: PolygonApi,
  prisma: PrismaClient
) {
  let responds;

  try {
    responds = await getDailyMarket(polygon, date);
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 403) {
      console.warn(e.response.data.message);
      console.warn("Skipping...");
      return;
    }
    console.error(e);
    return;
  }

  const results = responds?.data?.results;
  const resultsCount = responds?.data?.resultsCount;

  if (!results && resultsCount === 0) {
    console.info(`No results for ${date}`);
    return;
  }

  // to miliseconds
  const t = new Date(results[0].t);

  const allDailysAtDate = await prisma.usStockDaily.findMany({
    where: {
      t,
    },
  });

  const allTickersAtDate = allDailysAtDate.map((daily) => daily.usStocksT);

  for (const result of results) {
    let { T, t, ...data } = result;
    t = new Date(t);
    if (allTickersAtDate.includes(T)) {
      console.debug(`Skipping ${T} on ${date}... Record already exists.`);
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

    console.info(`Added ${T} on ${date} to db`);
  }
}
