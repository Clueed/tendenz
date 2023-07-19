import Bree from "bree";
import Fastify from "fastify";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prismaPlugin from "./plugins/prisma.js";

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

const fastify = Fastify({
  logger: true,
});

fastify.register(prismaPlugin);

fastify.get("/", async (request, reply) => {
  const test = await fastify.prisma.sigmaUsStocksYesterday.findMany({
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
