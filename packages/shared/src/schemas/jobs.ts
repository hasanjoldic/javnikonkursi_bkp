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

export type createJobTypeTagBodyType = Pick<
  JobTypeTag,
  JobTypeTagField.title | JobTypeTagField.notes
>;

export type updateJobTypeTagBodyType = Pick<
  JobTypeTag,
  JobTypeTagField.title | JobTypeTagField.notes
>;

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

export type createJobTypeBodyType = Pick<
  JobTypeTag,
  JobTypeTagField.title | JobTypeTagField.notes
>;

export type updateJobTypeBodyType = Pick<
  JobTypeTag,
  JobTypeTagField.title | JobTypeTagField.notes
>;

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

export type createJobBodyType = Pick<
  Job,
  | JobField.company_id
  | JobField.job_type_id
  | JobField.title
  | JobField.location
  | JobField.start_date
  | JobField.end_date
  | JobField.external_url
> & { internalFile: any };

export type updateJobBodyType = Pick<
  Job,
  | JobField.company_id
  | JobField.job_type_id
  | JobField.title
  | JobField.location
  | JobField.start_date
  | JobField.end_date
  | JobField.external_url
  | JobField.internal_url
>;
