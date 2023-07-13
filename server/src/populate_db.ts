import { Prisma, PrismaClient } from "@prisma/client";
import "dotenv/config";
import { PolygonApi } from "./polygonApi/polygonApi.js";
import { reverseIncrementDailyUpdate } from "./reverseIncrementDailyUpdate.js";
import { supplementTickerDetails } from "./supplementTickerDetails.js";

export const prisma = new PrismaClient();
export const polygon = new PolygonApi();

async function main() {
  //await reverseIncrementDailyUpdate(polygon, prisma, true);
  //await supplementTickerDetails(prisma, polygon);

  // TODO: calculations

  let date = new Date();
  date.setDate(date.getDate() - 2);

  const a = await prisma.usStocks.findMany({
    where: {
      dailys: {
        some: {
          date: {
            gt: date,
          },
        },
      },
    },
    select: {
      ticker: true,
      name: true,
      dailys: {
        orderBy: {
          date: "asc",
        },
        select: {
          date: true,
          close: true,
          marketCap: true,
        },
      },
    },
  });

  let marketSize: number = 0;

  for (const row of a) {
    const marketCap = row.dailys[row.dailys.length - 1].marketCap;
    if (marketCap) {
      marketSize += marketCap;
    }
  }

  await prisma.sigmaUsStocksYesterday.deleteMany();

  for (const b of a) {
    if (b.dailys.length < 3) {
      console.warn(
        `Not enough data points to calculate sigma (${b.dailys.length})`
      );
      continue;
    }

    const closes = b.dailys.map((c) => {
      return c.close;
    });

    let logReturns: number[] = [];

    for (let i = 0; i < closes.length - 1; i++) {
      const currentNumber = closes[i];
      const nextNumber = closes[i + 1];
      const logReturn = Math.log(currentNumber / nextNumber);
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

    const sigma = (logReturns[n - 1] - mean) / stdev;

    if (!sigma) {
      console.error("OMG! NO SIGMA");
      continue;
    }

    const mostRecentMarketCap = b.dailys
      .reverse()
      .find((a) => a.marketCap !== null)?.marketCap;

    if (!mostRecentMarketCap) {
      console.warn(`No market cap data for ${b.ticker}`);
      continue;
    }

    const marketCapWeight = mostRecentMarketCap / marketSize;

    const weight = (0.01 + marketCapWeight) * Math.abs(sigma);

    let sigmaRow: Prisma.SigmaUsStocksYesterdayCreateInput = {
      ticker: b.ticker,
      sigma,
      weight,
      lastClose: closes[closes.length - 1],
      secondLastClose: closes[closes.length - 2],
    };

    if (b.name) {
      sigmaRow.name = b.name;
    }

    await prisma.sigmaUsStocksYesterday.create({
      data: sigmaRow,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
