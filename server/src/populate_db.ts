import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { PolygonApi, getDailyMarket } from "./polygonApi.js";
import { updateDaily } from "./updateDaily.js";
import { formatDateString } from "./misc.js";

const prisma = new PrismaClient();

async function main() {
  const polygon = new PolygonApi();

  let date = new Date();

  date.setDate(date.getDate() - 2);

  if (true) {
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

    console.log("a :>> ", a);

    for (const d of dailys) {
    }

    return;
  }
  let startingPoint = 0;

  while (true) {
    let today = new Date();
    today.setDate(today.getDate() - startingPoint);
    let date = formatDateString(today);

    await updateDaily(date, polygon, prisma);

    startingPoint++;
  }
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
