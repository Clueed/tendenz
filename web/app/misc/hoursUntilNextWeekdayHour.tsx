"use client";
export function hoursUntilNextWeekdayHour(hour: number): number {
  const currentDate = new Date();
  const currentDay = currentDate.getUTCDay();

  let hoursRemaining = 0;

  if (currentDay === 5) {
    hoursRemaining = hour - currentDate.getUTCHours() + 24 * 3;
  } else if (currentDay === 6) {
    hoursRemaining = hour - currentDate.getUTCHours() + 24 * 2;
  } else {
    hoursRemaining = hour - currentDate.getUTCHours() + 24;
  }

  return hoursRemaining;
}
