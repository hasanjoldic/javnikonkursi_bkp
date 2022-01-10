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

var _getUserWithAccessToken = require("./getUserWithAccessToken");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
var jsonParser = (0, _bodyParser.json)();
router.post("/logout", jsonParser, (0, _expressValidator.body)("accessToken").isJWT(), (0, _expressValidator.body)("refreshToken").isString(), (0, _expressValidator.body)("shouldInvalidateAllJWTs").isBoolean(), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors, _req$body, accessToken, refreshToken, shouldInvalidateAllJWTs, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 4;
              break;
            }

            console.log(req.body);
            return _context.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              errors: errors.array()
            }));

          case 4:
            _req$body = req.body, accessToken = _req$body.accessToken, refreshToken = _req$body.refreshToken, shouldInvalidateAllJWTs = _req$body.shouldInvalidateAllJWTs;
            _context.next = 7;
            return (0, _getUserWithAccessToken.getUserWithAccessToken)(accessToken);

          case 7:
            user = _context.sent;

            if (!user) {
              res.status(_httpStatusCodes.StatusCodes.UNAUTHORIZED).send((0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.UNAUTHORIZED));
            }

            if (!shouldInvalidateAllJWTs) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return _db.client.query("\n          DELETE FROM refresh_tokens\n          WHERE user_id = $1;\n        ", [user.id]);

          case 12:
            _context.next = 17;
            break;

          case 14:
            if (!refreshToken) {
              res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).send((0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.BAD_REQUEST));
            }

            _context.next = 17;
            return _db.client.query("\n          DELETE FROM refresh_tokens\n          WHERE token = $1;\n        ", [refreshToken]);

          case 17:
            res.status(_httpStatusCodes.StatusCodes.OK).send((0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.OK));

          case 18:
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