import Fastify from "fastify";
import cors from "@fastify/cors";
import dummyData from "./db.json" assert { type: "json" };

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "*",
});

fastify.get("/us-stocks/daily/:page", async (request) => {
  return dummyData;
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
