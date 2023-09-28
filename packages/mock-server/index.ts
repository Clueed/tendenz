import Fastify from "fastify";
import cors from "@fastify/cors";
import { dummyData } from "./dummyData.js";
import { PAGE_SIZE } from "@tendenz/types";

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "*",
});

function cyrb128(str: string) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0] as const;
}

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function shuffleArray(array: any[], rand: () => number) {
  const shuffledArray = [...array]; // Create a shallow copy of the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1)); // Generate a random index
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }

  return shuffledArray; // Return the shuffled copy
}

fastify.get<{
  Params: {
    page: string;
  };
}>("/us-stocks/daily/:page", async (request) => {
  const { query } = request;

  const seed = cyrb128(JSON.stringify(query));
  console.log("seed :>> ", seed);
  const rand = sfc32(seed[0], seed[1], seed[2], seed[3]);

  const dataArray = dummyData;

  const shuffledArray = shuffleArray(dataArray, rand);

  const page = Number(request.params.page);

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return shuffledArray.slice(start, end);
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
