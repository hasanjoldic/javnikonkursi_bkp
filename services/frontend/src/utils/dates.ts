import { format } from "date-fns";

export enum EDateFormat {
  // 27.10.2020
  "dd.MM.yyyy" = "dd.MM.yyyy",
  // 27.10.2020 16:21:23
  "dd.MM.yyyy HH:mm:ss" = "dd.MM.yyyy HH:mm:ss",
}

export const dateFormat = (dateStr: string, formatStr: EDateFormat) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return format(date, formatStr);
};
