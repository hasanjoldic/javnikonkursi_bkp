import { Timestamp } from "./timestamps";

export enum UserRole {
  APP_USER = "app_user",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export enum UserField {
  role = "role",
  email = "email",
  is_email_verified = "is_email_verified",
  password = "password",
}

export interface User extends Timestamp {
  [UserField.role]: UserRole;
  [UserField.email]: string;
  [UserField.is_email_verified]: boolean;
  [UserField.password]: string;
}
