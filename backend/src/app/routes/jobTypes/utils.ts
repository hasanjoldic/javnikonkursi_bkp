import { JobType, JobTypeField, TimestampField } from "../../../db";

export const jobTypesReturnFields = [
  TimestampField.id,
  JobTypeField.title,
  JobTypeField.notes,
  TimestampField._created_at,
  TimestampField._updated_at,
];

export type jobTypesReturnType = Pick<
  JobType,
  | TimestampField.id
  | JobTypeField.title
  | JobTypeField.notes
  | TimestampField._created_at
  | TimestampField._updated_at
>;
