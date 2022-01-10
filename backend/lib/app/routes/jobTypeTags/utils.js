"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobTypeTagReturnFields = void 0;

var _db = require("../../../db");

var jobTypeTagReturnFields = [_db.TimestampField.id, _db.JobTypeTagField.title, _db.JobTypeTagField.notes, _db.TimestampField._created_at, _db.TimestampField._updated_at];
exports.jobTypeTagReturnFields = jobTypeTagReturnFields;