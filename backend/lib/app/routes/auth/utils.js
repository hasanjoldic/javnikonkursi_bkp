"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersReturnFields = void 0;

var _db = require("../../../db");

var usersReturnFields = [_db.TimestampField.id, _db.UserField.role, _db.UserField.email, _db.UserField.is_email_verified, _db.UserField.full_name, _db.TimestampField._created_at, _db.TimestampField._updated_at];
exports.usersReturnFields = usersReturnFields;