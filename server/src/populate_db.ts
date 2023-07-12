import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { PolygonApi } from "./polygonApi/polygonApi.js";
import { reverseIncrementDailyUpdate } from "./reverseIncrementDailyUpdate.js";
import { supplementMcName } from "./supplementMcName.js";

export const prisma = new PrismaClient();
export const polygon = new PolygonApi();

async function main() {
  //await reverseIncrementDailyUpdate(polygon, prisma, true);
  await supplementMcName();
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
