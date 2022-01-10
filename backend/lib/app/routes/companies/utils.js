"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.companiesReturnFields = void 0;

var _db = require("../../../db");

var companiesReturnFields = [_db.TimestampField.id, _db.CompanyField.title, _db.CompanyField.url, _db.CompanyField.location, _db.TimestampField._created_at, _db.TimestampField._updated_at];
exports.companiesReturnFields = companiesReturnFields;