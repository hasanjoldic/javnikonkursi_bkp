"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _bodyParser = require("body-parser");

var _httpStatusCodes = require("http-status-codes");

var _expressValidator = require("express-validator");

var _db = require("../../../db");

var _utils = require("./utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
var jsonParser = (0, _bodyParser.json)();
router.patch("/api/v1/jobs/:id", jsonParser, (0, _expressValidator.body)(_db.JobField.company_id).isString(), (0, _expressValidator.body)(_db.JobField.job_type_id).isString(), (0, _expressValidator.body)(_db.JobField.title).isString(), (0, _expressValidator.body)(_db.JobField.location).isString().optional(), (0, _expressValidator.body)(_db.JobField.start_date).isString(), (0, _expressValidator.body)(_db.JobField.end_date).isString(), (0, _expressValidator.body)(_db.JobField.external_url).isString().optional(), (0, _expressValidator.body)(_db.JobField.internal_url).isString(), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, errors, _req$body, company_id, job_type_id, title, location, start_date, end_date, external_url, internal_url, patchJobQuery, job;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 5;
              break;
            }

            console.log(req.body);
            return _context.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              errors: errors.array()
            }));

          case 5:
            _req$body = req.body, company_id = _req$body.company_id, job_type_id = _req$body.job_type_id, title = _req$body.title, location = _req$body.location, start_date = _req$body.start_date, end_date = _req$body.end_date, external_url = _req$body.external_url, internal_url = _req$body.internal_url;
            _context.next = 8;
            return _db.client.query("\n      UPDATE companies\n      SET\n        company_id = $2,\n        job_type_id = $3,\n        title = $4,\n        location = $5,\n        start_date = $6,\n        end_date = $7,\n        external_url = $8,\n        internal_url = $9\n      WHERE id = $1\n      RETURNING ".concat(_utils.jobsReturnFields.join(", "), "\n    "), [id, company_id, job_type_id, title, location, start_date, end_date, external_url, internal_url]);

          case 8:
            patchJobQuery = _context.sent;
            job = patchJobQuery.rows[0];
            res.status(_httpStatusCodes.StatusCodes.OK).json(job);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;