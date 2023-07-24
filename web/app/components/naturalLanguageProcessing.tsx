export function npl(date: string) {
  const delta = getDaysDifferenceFromNow(date);

  if (delta == 1) {
    return "yesterday";
  } else if (delta === 2) {
    return "day before yesterday";
  } else {
    return new Date(Date.parse(date))
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();
  }
}

function getDaysDifferenceFromNow(dateString: string): number {
  // Parse the ISO date string to create a Date object
  const targetDate = new Date(dateString);

  // Set the hours, minutes, seconds, and milliseconds to zero to ignore the time component
  targetDate.setHours(0, 0, 0, 0);

  // Get the current date and time
  const currentDate = new Date();

  // Set the hours, minutes, seconds, and milliseconds to zero
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the difference between the two dates in milliseconds
  const timeDifference = targetDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days and return the result
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}
