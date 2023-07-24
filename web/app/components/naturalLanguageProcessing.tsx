export function npl(date: string) {
  const lastDate = new Date(date);
  const delta = new Date().getDay() - lastDate.getDay();

  if (delta == -1) {
    return "yesterday";
  } else if (delta === -2) {
    return "day before yesterday";
  } else {
    return lastDate.toLocaleString("en-us", { weekday: "long" }).toLowerCase();
  }
}
