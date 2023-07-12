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
      date: {
        gt: date,
      },
      marketCap: null,
    },
    orderBy: {
      date: "desc",
    },
  });

  for (const daily of dailys) {
    const { date, ticker } = daily;
    const dateString = formatDateString(date);

    console.group(`Updating ${ticker} on ${dateString}`);
    const details = await tickerDetails(polygon, ticker, dateString);

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
        ticker,
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

    const marketCap = calculateMarketCap(
      market_cap,
      weighted_shares_outstanding,
      share_class_shares_outstanding,
      daily.close
    );

    // Probably could be more elegant.
    // If calculateMarketCap is called that
    // means that atleast one of the values is available
    // and there doesn't need to be the following check.
    if (marketCap === 0 || marketCap < 0) {
      console.error(
        `Could not calculate market cap...(This shouldn't happen!)`
      );
      continue;
    }

    console.debug(`Updating market cap: ${marketCap}`);
    await prisma.usStockDaily.update({
      where: {
        ticker_date: {
          ticker,
          date,
        },
      },
      data: {
        marketCap,
      },
    });
  }
}
