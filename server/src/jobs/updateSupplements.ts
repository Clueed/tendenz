import { dailySigmaRoutine } from "../dailyRoutine/dailySigmaRoutine.js";
import { supplementTickerDetails } from "../dailyRoutine/supplementTickerDetails.js";

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
await supplementTickerDetails();
await dailySigmaRoutine(prisma, false);
await prisma.$disconnect();
