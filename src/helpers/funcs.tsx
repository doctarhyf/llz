import { DEPARTEMENTS, TIME_CONST } from "./const";

export function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
  const day = String(date.getDate()).padStart(2, "0");

  let d = `${year}-${month}-${day}`;
  console.log(d);
  return d;
}

export function GetDepartementLabel(code: string) {
  const f = Object.values(DEPARTEMENTS).filter((dep) => dep.code === code);

  if (Array.isArray(f) && f.length > 0) {
    return f[0].label;
  } else {
    return DEPARTEMENTS.SOINS_CURRATIFS.label;
  }
}

export function GetLaterDate(add: "h" | "i" | "s", amount: number) {
  const cur_date = new Date();
  const cur_milli = cur_date.getTime();

  let mill2add = 0;

  if (add === "h") {
    mill2add = amount * TIME_CONST.ONE_HOUR;
  } else if (add === "i") {
    mill2add = amount * TIME_CONST.ONE_MIN;
  } else {
    mill2add = amount * TIME_CONST.ONE_SEC;
  }

  return new Date(cur_milli + mill2add);
}
