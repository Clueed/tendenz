import { PrismaClient } from "@prisma/client";
import { formatDateString } from "./misc.js";
import { tickerDetails } from "./polygonApi/getTickerDetails.js";
import { PolygonApi } from "./polygonApi/polygonApi.js";

export function calculateMarketCap(
  marketCap: number | undefined,
  weightedSharesOutstanding: number | undefined,
  shareClassSharesOutstanding: number | undefined,
  dailyClose: number
): number {
  if (marketCap) {
    return marketCap;
  }

  let mc = 0;

  if (weightedSharesOutstanding) {
    mc = weightedSharesOutstanding * dailyClose;
  } else if (shareClassSharesOutstanding) {
    mc = shareClassSharesOutstanding * dailyClose;
  }

  return mc;
}

export async function supplementTickerDetails(
  prisma: PrismaClient,
  polygon: PolygonApi
) {
  let date = new Date();
  date.setDate(date.getDate() - 2);

  const dailys = await prisma.usStockDaily.findMany({
    where: {
      t: {
        gt: date,
      },
      mc: null,
    },
    orderBy: {
      t: "desc",
    },
  });

  for (const daily of dailys) {
    const { t: timestamp, usStocksT } = daily;
    const dateString = formatDateString(timestamp);

    console.group(`Updating ${usStocksT} on ${dateString}`);
    const details = await tickerDetails(polygon, usStocksT, dateString);

    if (!details) {
      console.warn(`No details available. Skipping...`);
      continue;
    }

    const {
      name,
      market_cap,
      weighted_shares_outstanding,
      share_class_shares_outstanding,
    } = details;

    if (!name) {
      console.info(`No name available. Skipping...`);
      continue;
    }

    console.debug(`Updating name: "${name}"...`);
    await prisma.usStocks.update({
      where: {
        T: usStocksT,
      },
      data: {
        name,
      },
    });

    if (
      !(
        market_cap ||
        weighted_shares_outstanding ||
        share_class_shares_outstanding
      )
    ) {
      console.warn(`No market cap data available. Skipping...`);
      continue;
    }

    const mc = calculateMarketCap(
      market_cap,
      weighted_shares_outstanding,
      share_class_shares_outstanding,
      daily.c
    );

    // Probably could be more elegant.
    // If calculateMarketCap is called that
    // means that atleast one of the values is available
    // and there doesn't need to be the following check.
    if (mc === 0 || mc < 0) {
      console.error(
        `Could not calculate market cap...(This shouldn't happen!)`
      );
      continue;
    }

    console.debug(`Updating market cap: ${mc}`);
    await prisma.usStockDaily.update({
      where: {
        id: daily.id,
      },
      data: {
        mc,
      },
    });
  }
}
