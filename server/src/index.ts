// ESM
import Fastify from "fastify";
import { prisma } from "./globals.js";
import { dailySigmaRoutine } from "./dailyRoutine/dailySigmaRoutine.js";
import { dailyUpdateRoutine } from "./dailyRoutine/dailyUpdateRoutine.js";
import { supplementTickerDetails } from "./supplementTickerDetails.js";

console.log(process.env.NODE_ENV);

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

async function popDB() {
  try {
    console.group(`Initiating daily market update cycle`);
    await dailyUpdateRoutine(0);
    console.groupEnd();

    //console.group("Checking sigma staleness...");
    //await dailySigmaRoutine();
    //console.groupEnd();

    console.group(`Initiating data supplement cycle`);
    await supplementTickerDetails();
    console.groupEnd();
  } catch (e) {
    console.error(e);
  }
  await prisma.$disconnect();
}

start();
popDB();
