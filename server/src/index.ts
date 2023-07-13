// ESM
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fastify = Fastify({
  logger: true,
});

fastify.get("/stocks/us/yesterday", async (request, reply) => {
  const test = await prisma.sigmaUsStocksYesterday.findMany({
    orderBy: {
      weight: "desc",
    },
    take: 10,
  });

  return test;
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
