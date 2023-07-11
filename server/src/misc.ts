export function formatDateString(today: Date) {
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1; // Months start at 0!
  const dd = today.getDate();
  let date = " ";

  if (mm < 10 && dd < 10) date = yyyy + "-0" + mm + "-0" + dd;
  else if (mm < 10) date = yyyy + "-0" + mm + "-" + dd;
  else if (dd < 10) date = yyyy + "-" + mm + "-0" + dd;
  else date = yyyy + "-" + mm + "-" + dd;
  return date;
}
