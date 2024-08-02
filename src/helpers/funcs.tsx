export function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
  const day = String(date.getDate()).padStart(2, "0");

  let d = `${year}-${month}-${day}`;
  console.log(d);
  return d;
}
