import { Prisma } from "@prisma/client";
import { prisma } from "../globals.js";

export async function calcSigmas(dry: Boolean = false) {
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
        where: {
          marketCap: { not: null },
        },
        select: {
          marketCap: true,
        },
        orderBy: { date: "desc" },
        take: 1,
      },
    },
  });

  // casting type because marketCap has to be !== based on query above
  const marketCaps = stocks.map(
    (stock) => stock.dailys[0].marketCap
  ) as number[];

  const marketSize = marketCaps.reduce((a, b) => a + b);

  for (const { ticker, name } of stocks) {
    const dailys = await prisma.usStockDaily.findMany({
      where: {
        ticker,
      },
      orderBy: { date: "asc" },
      select: {
        marketCap: true,
        close: true,
      },
    });

    if (dailys.length < 30) {
      console.warn(
        `${ticker}: Not enough data points to calculate sigma (${dailys.length} < 30)`
      );
      continue;
    }

    const closes = dailys.map((daily) => daily.close);
    const closesChronological = closes.reverse();
    let logReturns = calcLogReturns(closesChronological).reverse();
    if (logReturns.length === 0) {
      console.error("OMG! NO LOG RETURNS");
      continue;
    }

    const lastSigma = calcSigma(logReturns.slice(1), logReturns[0]);
    if (!lastSigma) {
      console.error("OMG! NO SIGMA");
      continue;
    }

    const mostRecentMarketCap = dailys.find(
      (daily) => daily.marketCap !== null
    )?.marketCap;
    if (!mostRecentMarketCap) {
      console.error("OMG! NO MARKETCAP!");
      continue;
    }

    const marketCapWeight = mostRecentMarketCap / marketSize;
    const weight = (0.5 + marketCapWeight) * Math.abs(lastSigma);

    if (!weight) {
      console.error("OMG! NO WEIGHT!");
      console.error("Weight:", weight);
      continue;
    }

    let sigmaRow: Prisma.SigmaUsStocksYesterdayCreateInput = {
      ticker: ticker,
      sigma: lastSigma,
      date: targetDate,
      weight,
      lastClose: closes[0],
      secondLastClose: closes[1],
    };

    if (name) {
      sigmaRow.name = name;
    }

    if (!dry) {
      await prisma.sigmaUsStocksYesterday.create({
        data: sigmaRow,
      });
    }
  }
}

function calcSigma(population: number[], sample: number) {
  const n = population.length;
  const mean = population.reduce((a, b) => a + b) / n;
  const stdev = Math.sqrt(
    population.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );

  const lastSigma = (sample - mean) / stdev;
  return lastSigma;
}

function calcLogReturns(closesChronological: number[]): number[] {
  let logReturns: number[] = [];
  for (let i = 1; i < closesChronological.length; i++) {
    const curr = closesChronological[i];
    const prev = closesChronological[i - 1];
    const logReturn = Math.log(curr / prev);
    logReturns.push(logReturn);
  }
  return logReturns;
}
