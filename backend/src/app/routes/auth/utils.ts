import { User, UserField, TimestampField } from "../../../db";

export const usersReturnFields = [
  TimestampField.id,
  UserField.role,
  UserField.email,
  UserField.is_email_verified,
  UserField.full_name,
  TimestampField._created_at,
  TimestampField._updated_at,
];

export type usersReturnType = Pick<
  User,
  | TimestampField.id
  | UserField.role
  | UserField.email
  | UserField.is_email_verified
  | UserField.full_name
  | TimestampField._created_at
  | TimestampField._updated_at
>;
