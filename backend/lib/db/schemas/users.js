"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRole = exports.UserField = void 0;
var UserRole;
exports.UserRole = UserRole;

(function (UserRole) {
  UserRole["APP_USER"] = "app_user";
  UserRole["ADMIN"] = "admin";
  UserRole["SUPER_ADMIN"] = "super_admin";
})(UserRole || (exports.UserRole = UserRole = {}));

var UserField;
exports.UserField = UserField;

(function (UserField) {
  UserField["role"] = "role";
  UserField["email"] = "email";
  UserField["is_email_verified"] = "is_email_verified";
  UserField["password"] = "password";
})(UserField || (exports.UserField = UserField = {}));