import Bree from "bree";
import Fastify from "fastify";
import { dailySigmaRoutine } from "./dailyRoutine/dailySigmaRoutine.js";
import { reverseIncrementDailyUpdate } from "./dailyRoutine/reverseIncrementDailyUpdate.js";
import { supplementTickerDetails } from "./dailyRoutine/supplementTickerDetails.js";
import { prisma } from "./globals.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  const test = await prisma.sigmaUsStocksYesterday.findMany({
    orderBy: {
      weight: "desc",
    },
    take: 10,
  });

  return test;
});

const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  jobs: [
    {
      name: "updateMarket",
      cron: "3 * * * *",
    },
    {
      name: "updateSupplements",
      cron: "10 0 * * *",
      closeWorkerAfterMs: 59 * 60 * 1000,
    },
    {
      name: "updateSigma",
      cron: "30 */3 * * *",
    },
  ],
});

const start = async () => {
  try {
    bree.start();
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
