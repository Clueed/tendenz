import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { PolygonApi } from "./polygonApi/polygonApi.js";
import { reverseIncrementDailyUpdate } from "./reverseIncrementDailyUpdate.js";
import { supplementTickerDetails } from "./supplementTickerDetails.js";
import { calcSigmas } from "./calcSigmas.js";

export const prisma = new PrismaClient();
export const polygon = new PolygonApi();

async function main() {
  //await reverseIncrementDailyUpdate(polygon, prisma, true);
  //await supplementTickerDetails(prisma, polygon);

  // TODO: calculations

  await calcSigmas(prisma);
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
