"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobTypesReturnFields = void 0;

var _db = require("../../../db");

var jobTypesReturnFields = [_db.TimestampField.id, _db.JobTypeField.title, _db.JobTypeField.notes, _db.TimestampField._created_at, _db.TimestampField._updated_at];
exports.jobTypesReturnFields = jobTypesReturnFields;