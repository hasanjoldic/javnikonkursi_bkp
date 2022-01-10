"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobsReturnFields = void 0;

var _db = require("../../../db");

var jobsReturnFields = [_db.TimestampField.id, _db.JobField.company_id, _db.JobField.job_type_id, _db.JobField.title, _db.JobField.location, _db.JobField.start_date, _db.JobField.end_date, _db.JobField.external_url, _db.JobField.internal_url, _db.TimestampField._created_at, _db.TimestampField._updated_at];
exports.jobsReturnFields = jobsReturnFields;