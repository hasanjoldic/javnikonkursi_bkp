import { Job, JobField, TimestampField } from "../../../db";

export const jobsReturnFields = [
  TimestampField.id,
  JobField.company_id,
  JobField.job_type_id,
  JobField.title,
  JobField.location,
  JobField.start_date,
  JobField.end_date,
  JobField.external_url,
  JobField.internal_url,
  TimestampField._created_at,
  TimestampField._updated_at,
];

export type jobsReturnType = Pick<
  Job,
  | TimestampField.id
  | JobField.company_id
  | JobField.job_type_id
  | JobField.title
  | JobField.location
  | JobField.start_date
  | JobField.end_date
  | TimestampField._created_at
  | TimestampField._updated_at
>;
