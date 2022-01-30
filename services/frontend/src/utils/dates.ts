import { format } from "date-fns";

export enum EDateFormat {
  // 27.10.2020
  "DD.MM.YYYY" = "DD.MM.YYYY",
  // 27.10.2020 16:21:23
  "DD.MM.YYYY HH:mm:ss" = "DD.MM.YYYY HH:mm:ss",
}

export const momentFormat = (dateStr: string, formatStr: EDateFormat) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return format(date, formatStr);
};
