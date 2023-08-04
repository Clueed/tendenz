import { calcSigmas } from "./calcSigmas.js";
import { formatDateString } from "../misc.js";
import { prisma } from "../globals.js";

async function detectSigmaStaleness(): Promise<boolean> {
  console.group("Initiating calcSigma job...");
  const mostRecentDaily = await prisma.usStockDaily.findFirst({
    orderBy: {
      date: "desc",
    },
    take: 1,
    select: {
      date: true,
    },
  });

  if (mostRecentDaily === null) {
    console.error("Database is empty. Aborting...");
    return false;
  }

  const targetDate = mostRecentDaily.date;
  console.debug(`Most recent daily date is ${formatDateString(targetDate)}.`);

  const sigmaCount = await prisma.sigmaUsStocksYesterday.count({
    where: {
      lastDate: targetDate,
    },
  });

  if (sigmaCount === 0) {
    console.debug(`No sigmas entries on ${targetDate}`);
    return true;
  }

  // This doesn't make sense
  // it need to look for some: {target_date} and some: {marketCap : not null}
  // Sigma can't be calculated for some because of populations amounts
  // So this will always be true
  const dailyCount = await prisma.usStockDaily.count({
    where: {
      date: targetDate,
      marketCap: { not: null },
    },
  });

  if (sigmaCount !== dailyCount) {
    return true;
  }

  return false;
}

import { PrismaClient } from "@prisma/client";

export async function dailySigmaRoutine(dry: boolean = false) {
  const prisma = new PrismaClient();
  try {
    //const stale = await detectSigmaStaleness();
    const stale = true;

    if (stale) {
      console.info(`Sigma staleness detected.`);
      console.info(`Initiating sigma recalculation...`);
      await prisma.sigmaUsStocksYesterday.deleteMany({});
      await calcSigmas(prisma, dry);
      console.info(`Sigma recalculation complete...`);
    } else {
      console.info(`No sigma staleness detected. Skipping...`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  console.groupEnd();
}
