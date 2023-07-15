import Bree from "bree";
import Fastify from "fastify";
import { dailySigmaRoutine } from "./dailyRoutine/dailySigmaRoutine.js";
import { reverseIncrementDailyUpdate } from "./dailyRoutine/reverseIncrementDailyUpdate.js";
import { supplementTickerDetails } from "./dailyRoutine/supplementTickerDetails.js";
import { prisma } from "./globals.js";

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

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

const bree = new Bree({
  jobs: [
    {
      name: "updateMarket",
      cron: "3 * * * *",
    },
  ],
});

async function popDB() {
  try {
    await dailySigmaRoutine();
    supplementTickerDetails();
    await bree.start();
  } catch (e) {
    console.error(e);
  }
  await prisma.$disconnect();
}

start();
popDB();
