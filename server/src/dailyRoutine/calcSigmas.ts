import { Prisma } from "@prisma/client";
import { prisma } from "../globals.js";

export async function calcSigmas() {
  await prisma.sigmaUsStocksYesterday.deleteMany();

  const mostRecentStock = await prisma.usStockDaily.findMany({
    orderBy: {
      date: "desc",
    },
    take: 1,
    select: {
      date: true,
    },
  });

  const targetDate = mostRecentStock[0].date;

  const stocks = await prisma.usStocks.findMany({
    where: {
      AND: [
        {
          dailys: {
            some: {
              date: targetDate,
            },
          },
        },
        {
          dailys: {
            some: {
              marketCap: { not: null },
            },
          },
        },
      ],
    },
    select: {
      ticker: true,
      name: true,
      dailys: {
        orderBy: {
          date: "desc",
        },
        select: {
          date: true,
          close: true,
          marketCap: true,
        },
      },
    },
  });

  // given the query above
  // all the dailys will be order such that
  // (1) its a descending
  // (2) index = 0 is the same everywhere and the most recent
  // (3) all stocks in the array have a value on that day (index = 0)
  // (4) all have atleast one value for marketCap (doesn't have to be recent)

  const marketCaps = stocks.map(
    (stock) => stock.dailys.find((daily) => daily.marketCap !== null)?.marketCap
  ) as number[];

  const marketSize = marketCaps.reduce((a, b) => a + b);

  for (const i in stocks.slice(0, 100)) {
    const stock = stocks[i];

    if (stock.dailys.length < 3) {
      console.warn(
        `Not enough data points to calculate sigma (${stock.dailys.length})`
      );
      continue;
    }

    const closes = stock.dailys.map((daily) => daily.close);

    // no going forward in time with reverse()

    let logReturns: number[] = [];
    const closesChronological = closes.slice(1).reverse();

    for (let i = 1; i < closesChronological.length; i++) {
      const curr = closes[i];
      const prev = closes[i - 1];
      const logReturn = Math.log(curr / prev);
      logReturns.push(logReturn);
    }

    if (logReturns.length === 0) {
      console.error("OMG! NO LOG RETURNS");
      continue;
    }

    const n = logReturns.length;
    const mean = logReturns.reduce((a, b) => a + b) / n;
    const stdev = Math.sqrt(
      logReturns.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
    );

    const lastSigma = (logReturns[0] - mean) / stdev;

    if (!lastSigma) {
      console.error("OMG! NO SIGMA");
      continue;
    }

    const mostRecentMarketCap = marketCaps[i];
    const marketCapWeight = mostRecentMarketCap / marketSize;
    const weight = (0.5 + marketCapWeight) * Math.abs(lastSigma);

    let sigmaRow: Prisma.SigmaUsStocksYesterdayCreateInput = {
      ticker: stock.ticker,
      sigma: lastSigma,
      date: targetDate,
      weight,
      lastClose: closes[0],
      secondLastClose: closes[1],
    };

    if (stock.name) {
      sigmaRow.name = stock.name;
    }

    await prisma.sigmaUsStocksYesterday.create({
      data: sigmaRow,
    });
  }
}
