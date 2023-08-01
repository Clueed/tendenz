import { Prisma } from "@prisma/client";
import { prisma } from "../globals.js";
import { AssertionError, ok } from "node:assert";

export async function calcSigmas(dry: Boolean = false) {
  const mostRecentDate = await getMostRecentDate();
  ok(mostRecentDate);
  console.info(`Most recent date is ${mostRecentDate}`);

  const stocks = await getStocksOnDate(mostRecentDate);
  console.info(
    `Found ${stocks.length} that traded on ${mostRecentDate} and have market caps.`
  );

  const marketCaps = stocks.map((stock) => {
    const marketCap = stock.dailys[0].marketCap;
    if (typeof marketCap !== "number") {
      throw new Error(
        `Invalid market cap data for stock '${stock.ticker}' on ${mostRecentDate}. Expected a number but received '${marketCap}'.`
      );
    } else {
      return marketCap;
    }
  });

  const marketSize = marketCaps.reduce((a, b) => a + b);

  for (const { ticker, name } of stocks) {
    let sigmaRow: Prisma.SigmaUsStocksYesterdayCreateInput | false;
    try {
      sigmaRow = await handleStock(ticker, marketSize, name);

      if (sigmaRow === false) {
        continue;
      }
    } catch (e) {
      if (e instanceof AssertionError) {
        console.warn(e.message);
        continue;
      } else {
        console.error(e);
        break;
      }
    }
    if (!dry) {
      await prisma.sigmaUsStocksYesterday.create({
        data: sigmaRow,
      });
    }
  }
}

async function getMostRecentDate(): Promise<Date | undefined> {
  const stock = await prisma.usStockDaily.findFirst({
    orderBy: {
      date: "desc",
    },
    take: 1,
    select: {
      date: true,
    },
  });
  return stock?.date;
}

async function handleStock(
  ticker: string,
  marketSize: number,
  name: string | null
): Promise<Prisma.SigmaUsStocksYesterdayCreateInput | false> {
  console.debug(`Calculating sigma for ${ticker}`);

  const dailys = await getDailyOfStock(ticker);

  const minPopulation = 30;

  if (dailys.length < minPopulation) {
    console.warn(
      `${ticker} does not have enough data points (${dailys.length} < ${minPopulation}). Skipping...`
    );
    return false;
  }

  const dailyWithLog = calcLogReturns(dailys, "close", "date");

  ok(dailyWithLog, `${ticker}: LogReturn calculation failed. Skipping...`);

  dailyWithLog.sort((a, b) => {
    // "desc"
    return b.date.getTime() - a.date.getTime();
  });

  const [lastDailyWithLog, ...logReturnPopulation] = dailyWithLog;
  const secondlastDailyWithLog = dailyWithLog[1];
  ok(
    lastDailyWithLog.logReturn,
    `${ticker}: LogReturn not available for the most recent date. Skipping...`
  );

  const { sigma, n, stdev, mean } = calcSigma(
    logReturnPopulation.map((r) => r.logReturn),
    lastDailyWithLog.logReturn
  );

  ok(sigma, `${ticker}: Sigma calculation failed. Skipping...`);

  const mostRecentMarketCap = dailys.find(
    (daily) => daily.marketCap
  )?.marketCap;

  ok(
    mostRecentMarketCap,
    `${ticker}: Market cap data not available. Skipping...`
  );

  const marketCapWeight = mostRecentMarketCap / marketSize;
  const weight = (0.25 + marketCapWeight) * Math.abs(sigma);

  ok(weight, `${ticker}: Weight calculation failed. Skipping...`);

  return {
    ticker,
    name,
    sigma,
    absSigma: Math.abs(sigma),
    stdLogReturn: stdev,
    meanLogReturn: mean,
    sampleSize: n,
    weight,
    lastLogReturn: lastDailyWithLog.logReturn,
    lastClose: lastDailyWithLog.close,
    lastDate: lastDailyWithLog.date,
    secondLastLogReturn: secondlastDailyWithLog.logReturn,
    secondLastClose: secondlastDailyWithLog.close,
    secondLastDate: secondlastDailyWithLog.date,
    marketCap: mostRecentMarketCap,
  };
}

async function getStocksOnDate(targetDate: Date) {
  return await prisma.usStocks.findMany({
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
}

async function getDailyOfStock(ticker: string) {
  return await prisma.usStockDaily.findMany({
    where: {
      ticker,
    },
    orderBy: { date: "asc" },
    select: {
      marketCap: true,
      close: true,
      date: true,
    },
  });
}

function calcSigma(population: number[], sample: number) {
  const n = population.length;
  const mean = population.reduce((a, b) => a + b) / n;
  const stdev = Math.sqrt(
    population.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );

  const lastSigma = (sample - mean) / stdev;
  return { sigma: lastSigma, stdev, mean, n };
}

function calcLogReturns<T extends Partial<Record<keyof T, any>>>(
  dataPoints: T[],
  calckey: keyof T,
  sortKey: keyof T
): (T & { logReturn: number })[] {
  dataPoints.sort((a, b) => {
    return a[sortKey].getTime() - b[sortKey].getTime();
  });

  let dataPointsWithLogReturn: (T & { logReturn: number })[] = [];

  for (let i = 1; i < dataPoints.length; i++) {
    const curr = dataPoints[i];
    const prev = dataPoints[i - 1];
    const logReturn = Math.log(curr[calckey] / prev[calckey]);
    dataPointsWithLogReturn.push({
      ...curr,
      logReturn,
    });
  }

  return dataPointsWithLogReturn;
}
