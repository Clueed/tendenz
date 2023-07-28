import Bree from "bree";
import Fastify from "fastify";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prismaPlugin from "./plugins/prisma.js";
import { Prisma } from "@prisma/client";

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

const fastify = Fastify({
  logger: true,
});

fastify.register(prismaPlugin);

fastify.get("/", async (request, reply) => {
  const query = request.query as Params;
  const minMarketCap = Number(query?.minMarketCap);

  let where: Prisma.SigmaUsStocksYesterdayWhereInput = {};
  if (minMarketCap) {
    where.marketCap = {
      gt: minMarketCap,
    };
  }

  const sigmaYesterday = await fastify.prisma.sigmaUsStocksYesterday.findMany({
    orderBy: {
      weight: "desc",
    },
    where,
    take: 10,
  });

  const response: tendenzApiSigmaYesterday[] = sigmaYesterday.map(
    ({
      ticker,
      name,
      sigma,
      weight,
      marketCap,
      stdLogReturn,
      meanLogReturn,
      sampleSize,
      lastClose,
      lastLogReturn,
      lastDate,
      secondLastClose,
      secondLastLogReturn,
      secondLastDate,
    }) => ({
      ticker,
      name,
      sigma,
      weight,
      marketCap,
      stdLogReturn,
      meanLogReturn,
      sampleSize,
      last: { close: lastClose, logReturn: lastLogReturn, date: lastDate },
      secondLast: {
        close: secondLastClose,
        logReturn: secondLastLogReturn,
        date: secondLastDate,
      },
    })
  );

  return response;
});

const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  jobs: [
    {
      name: "updateMarket",
      cron: "5 * * * *",
    },
    {
      name: "updateSupplements",
      cron: "0 4 * * *",
    },
  ],
});

const start = async () => {
  bree.start();
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export interface Params {
  minMarketCap?: string;
}

export interface tendenzApiSigmaYesterdayDay {
  close: number;
  logReturn: number;
  date: Date;
}

export interface tendenzApiSigmaYesterday {
  ticker: string;
  name: string | null;
  sigma: number;
  weight: number;
  marketCap: number;
  stdLogReturn: number;
  meanLogReturn: number;
  sampleSize: number;
  last: tendenzApiSigmaYesterdayDay;
  secondLast: tendenzApiSigmaYesterdayDay;
}
