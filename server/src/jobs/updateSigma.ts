import { dailySigmaRoutine } from "../dailyRoutine/dailySigmaRoutine.js";

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

await dailySigmaRoutine();
