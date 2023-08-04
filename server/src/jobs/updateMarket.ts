import { dailySigmaRoutine } from "../dailyRoutine/dailySigmaRoutine.js";
import { reverseIncrementDailyUpdate } from "../dailyRoutine/reverseIncrementDailyUpdate.js";

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
await reverseIncrementDailyUpdate();
await dailySigmaRoutine(prisma, false);
await prisma.$disconnect();
