import { supplementTickerDetails } from "../dailyRoutine/supplementTickerDetails.js";

if (process.env.NODE_ENV === "production") {
  console.debug = function () {};
}

await supplementTickerDetails();