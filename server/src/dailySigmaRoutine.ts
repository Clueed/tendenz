import { calcSigmas } from "./calcSigmas.js";
import { formatDateString } from "./misc.js";
import { prisma } from "./populate_db.js";

export async function dailySigmaRoutine() {
  const mostRecentStock = await prisma.usStockDaily.findMany({
    orderBy: {
      date: "desc",
    },
    take: 1,
    select: {
      date: true,
    },
  });

  const mostRecentDailyDate = mostRecentStock[0].date;
  console.debug(
    `Most recent daily data is ${formatDateString(mostRecentDailyDate)}`
  );

  const mostRecentSigma = await prisma.sigmaUsStocksYesterday.findMany({
    orderBy: {
      date: "desc",
    },
    take: 1,
    select: {
      date: true,
    },
  });

  if (mostRecentSigma.length > 0) {
    const mostRecentSigmaDailyDate = mostRecentSigma[0].date;
    console.debug(
      `Most recent sigma is ${formatDateString(mostRecentSigmaDailyDate)}`
    );

    if (mostRecentSigmaDailyDate === mostRecentDailyDate) {
      console.info(`No sigma staleness detected. Skipping...`);
      return;
    }

    console.info(`Sigma staleness detected.`);
  } else {
    console.info("No sigma data available.");
  }

  console.info(`Initiating sigma recalculation...`);
  await calcSigmas(prisma);
  return;
}
