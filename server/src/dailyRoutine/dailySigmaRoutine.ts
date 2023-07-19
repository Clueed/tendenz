import { calcSigmas } from "./calcSigmas.js";
import { formatDateString } from "../misc.js";
import { prisma } from "../globals.js";

async function detectSigmaStaleness(): Promise<boolean> {
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
      date: targetDate,
    },
  });

  if (sigmaCount === 0) {
    console.debug(`No sigmas entries on ${targetDate}`);
    return true;
  }

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

export async function dailySigmaRoutine(dry: boolean = false) {
  const stale = await detectSigmaStaleness();

  if (stale) {
    console.info(`Sigma staleness detected.`);
    console.info(`Initiating sigma recalculation...`);
    await calcSigmas(dry);
    console.info(`Sigma recalculation complete...`);
  } else {
    console.info(`No sigma staleness detected. Skipping...`);
  }
}
