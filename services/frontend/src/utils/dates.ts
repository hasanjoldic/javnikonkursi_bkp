import moment from "moment";

export enum EDateFormat {
  "DD.MM.yyyy" = "DD.MM.yyyy",
}

export const momentFormat = (date: string, format: EDateFormat) => {
  const momentObj = moment(date);
  if (!momentObj.isValid()) return "";
  return momentObj.format(format);
};
