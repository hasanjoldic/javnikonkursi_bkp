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
router.patch("/api/v1/job_types/:id", jsonParser, (0, _expressValidator.body)(_db.JobTypeTagField.title).isString(), (0, _expressValidator.body)(_db.JobTypeTagField.notes).isString().optional(), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, errors, _req$body, title, notes, patchQuery, job;

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
            _req$body = req.body, title = _req$body.title, notes = _req$body.notes;
            _context.next = 8;
            return _db.client.query("\n      UPDATE job_types\n      SET\n        title = $2,\n        notes = $3\n      WHERE id = $1\n      RETURNING ".concat(_utils.jobTypesReturnFields.join(", "), "\n    "), [id, title, notes]);

          case 8:
            patchQuery = _context.sent;
            job = patchQuery.rows[0];
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