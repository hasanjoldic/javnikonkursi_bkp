import { Company, CompanyField, TimestampField } from "../../../db";

export const companiesReturnFields = [
  TimestampField.id,
  CompanyField.title,
  CompanyField.url,
  CompanyField.location,
  TimestampField._created_at,
  TimestampField._updated_at,
];

export type companiesReturnType = Pick<
  Company,
  | TimestampField.id
  | CompanyField.title
  | CompanyField.url
  | CompanyField.location
  | TimestampField._created_at
  | TimestampField._updated_at
>;
