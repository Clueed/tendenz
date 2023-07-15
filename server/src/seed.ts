// ESM
import { prisma } from "./globals.js";
import { dailySigmaRoutine } from "./dailyRoutine/dailySigmaRoutine.js";
import { dailyUpdateRoutine } from "./dailyRoutine/dailyUpdateRoutine.js";
import { supplementTickerDetails } from "./supplementTickerDetails.js";
import { timeout } from "./misc.js";

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

try {
  console.group(`Initiating market update cycle`);
  await dailyUpdateRoutine(0);
  console.groupEnd();

  console.group(`Initiating data supplement cycle`);
  supplementTickerDetails();
  console.groupEnd();

  // Time for about 100 stocks in 20mins
  await timeout(1000 * 12 * 100);

  console.group("Checking sigma staleness...");
  await dailySigmaRoutine();
  console.groupEnd();
} catch (e) {
  console.error(e);
}
await prisma.$disconnect();
