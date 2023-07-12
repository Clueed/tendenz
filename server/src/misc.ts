import { PrismaClient } from "@prisma/client";

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
  input_date: number | Date,
  prisma: PrismaClient
): Promise<string[]> {
  let t: Date;

  if (input_date instanceof Date) {
    t = input_date;
  } else {
    t = new Date(input_date);
  }

  const allDailysAtDate = await prisma.usStockDaily.findMany({
    where: {
      t,
    },
  });

  return allDailysAtDate.map((daily) => daily.usStocksT);
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
