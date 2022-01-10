"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobTypeTagField = exports.JobTypeField = exports.JobField = void 0;
var JobTypeTagField;
exports.JobTypeTagField = JobTypeTagField;

(function (JobTypeTagField) {
  JobTypeTagField["title"] = "title";
  JobTypeTagField["notes"] = "notes";
  JobTypeTagField["job_types"] = "job_types";
})(JobTypeTagField || (exports.JobTypeTagField = JobTypeTagField = {}));

var JobTypeField;
exports.JobTypeField = JobTypeField;

(function (JobTypeField) {
  JobTypeField["title"] = "title";
  JobTypeField["notes"] = "notes";
  JobTypeField["tags"] = "tags";
})(JobTypeField || (exports.JobTypeField = JobTypeField = {}));

var JobField;
exports.JobField = JobField;

(function (JobField) {
  JobField["company_id"] = "company_id";
  JobField["company"] = "company";
  JobField["job_type_id"] = "job_type_id";
  JobField["job_type"] = "job_type";
  JobField["title"] = "title";
  JobField["location"] = "location";
  JobField["start_date"] = "start_date";
  JobField["end_date"] = "end_date";
  JobField["external_url"] = "external_url";
  JobField["internal_url"] = "internal_url";
})(JobField || (exports.JobField = JobField = {}));