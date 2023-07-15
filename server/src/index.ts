// ESM
import Fastify from "fastify";
import { prisma } from "./globals.js";
import { dailySigmaRoutine } from "./dailyRoutine/dailySigmaRoutine.js";
import { dailyUpdateRoutine } from "./dailyRoutine/dailyUpdateRoutine.js";
import { supplementTickerDetails } from "./supplementTickerDetails.js";

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
  async () => {
    console.group(`Initiating daily market update cycle`);
    await dailyUpdateRoutine();
    console.groupEnd();

    console.group("Checking sigma staleness...");
    await dailySigmaRoutine();
    console.groupEnd();

    await supplementTickerDetails();
  };

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }

  await prisma.$disconnect();
};

start();
