import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { PolygonApi } from "./polygonApi/polygonApi.js";
import { reverseIncrementDailyUpdate } from "./reverseIncrementDailyUpdate.js";

const prisma = new PrismaClient();
const polygon = new PolygonApi();

async function main() {
  await reverseIncrementDailyUpdate(polygon, prisma, true);

  /* let date = new Date();

    date.setDate(date.getDate() - 2);
    const dailys = await prisma.usStockDaily.findMany({
      where: {
        t: {
          gt: date,
        },
      },
      orderBy: {
        t: "desc",
      },
    });

    for (const d of dailys) {
    }

    return;*/
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
