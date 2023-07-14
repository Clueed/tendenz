import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { PolygonApi } from "./polygonApi/polygonApi.js";
import { reverseIncrementDailyUpdate } from "./reverseIncrementDailyUpdate.js";
import { supplementTickerDetails } from "./supplementTickerDetails.js";
import { dailySigmaRoutine } from "./dailySigmaRoutine.js";
import { dailyUpdateRoutine } from "./dailyUpdateRoutine.js";

export const prisma = new PrismaClient();
export const polygon = new PolygonApi();

async function main() {
  console.group(`Initiating daily market update cycle`);
  await dailyUpdateRoutine();
  console.groupEnd();

  console.group("Checking sigma staleness...");
  await dailySigmaRoutine();
  console.groupEnd();
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
