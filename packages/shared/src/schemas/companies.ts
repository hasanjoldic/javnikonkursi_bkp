import { Location } from "./locations";
import { Timestamp } from "./timestamps";

export enum CompanyField {
  title = "title",
  url = "url",
  location = "location",
}

export interface Company extends Timestamp {
  [CompanyField.title]: string;
  [CompanyField.url]: string;
  [CompanyField.location]?: Location;
}

export type createCompanyBodyType = Pick<
  Company,
  CompanyField.url | CompanyField.title | CompanyField.location
>;

export type updateCompanyBodyType = Partial<
  Pick<Company, CompanyField.url | CompanyField.title | CompanyField.location>
>;
