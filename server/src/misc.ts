import { prisma } from "./globals.js";

export function DateStringToDate(dateString: string): Date {
  return new Date(Date.parse(dateString));
}

export function formatDateString(inputDate: Date | number): string {
  let date: Date;

  if (inputDate instanceof Date) {
    date = inputDate;
  } else {
    date = new Date(inputDate);
  }

  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1; // Months start at 0!
  const dd = date.getDate();

  let dateString = " ";
  if (mm < 10 && dd < 10) dateString = yyyy + "-0" + mm + "-0" + dd;
  else if (mm < 10) dateString = yyyy + "-0" + mm + "-" + dd;
  else if (dd < 10) dateString = yyyy + "-" + mm + "-0" + dd;
  else dateString = yyyy + "-" + mm + "-" + dd;

  return dateString;
}

export async function allDailysOnDate(
  input_date: number | Date
): Promise<string[]> {
  let date: Date;

  if (input_date instanceof Date) {
    date = input_date;
  } else {
    date = new Date(input_date);
  }

  const allDailysAtDate = await prisma.usStockDaily.findMany({
    where: {
      date,
    },
  });

  return allDailysAtDate.map((daily) => daily.ticker);
}

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertDateToUTC(date: Date): Date {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}
