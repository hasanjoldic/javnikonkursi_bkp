import { Company } from "./companies";
import { Location } from "./locations";
import { Timestamp } from "./timestamps";

export enum JobTypeTagField {
  title = "title",
  notes = "notes",
  job_types = "job_types",
}

export interface JobTypeTag extends Timestamp {
  [JobTypeTagField.title]: string;
  [JobTypeTagField.notes]: string;
  [JobTypeTagField.job_types]: JobTypeTag[];
}

export enum JobTypeField {
  title = "title",
  notes = "notes",
  tags = "tags",
}

export interface JobType extends Timestamp {
  [JobTypeField.title]: string;
  [JobTypeField.notes]: string;
  [JobTypeField.tags]: JobTypeTag[];
}

export enum JobField {
  company_id = "company_id",
  company = "company",
  job_type_id = "job_type_id",
  job_type = "job_type",

  title = "title",
  location = "location",
  start_date = "start_date",
  end_date = "end_date",

  external_url = "external_url",
  internal_url = "internal_url",
}

export interface Job extends Timestamp {
  [JobField.company_id]: string;
  [JobField.company]?: Company;
  [JobField.job_type_id]: string;
  [JobField.job_type]?: JobType;

  [JobField.title]: string;
  [JobField.location]?: Location;
  [JobField.start_date]: string;
  [JobField.end_date]: string;

  [JobField.external_url]?: string;
  [JobField.internal_url]: string;
}

// export enum EJobType {
//   "Zdravstvo" = "Zdravstvo",
//   "Obrazovanje" = "Obrazovanje",
//   "Socijalni rad" = "Socijalni rad",
//   "Pravni poslovi" = "Pravni poslovi",
//   "Poslovi u proizvodnji" = "Poslovi u proizvodnji",
//   "MUP" = "MUP",
//   "Vodovod i kanalizacija" = "Vodovod i kanalizacija",
//   "Poslovi u kulturnim ustanovama" = "Poslovi u kulturnim ustanovama",
//   "BH Telecom" = "BH Telecom",
//   "Elektroprivreda BiH" = "Elektroprivreda BiH",
// }
