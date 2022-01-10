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

var _createJWTs = require("./createJWTs");

var _getUserWithAccessToken = require("./getUserWithAccessToken");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
var jsonParser = (0, _bodyParser.json)();
router.post("/refresh", jsonParser, (0, _expressValidator.body)("accessToken").isJWT(), (0, _expressValidator.body)("refreshToken").isString(), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _verifyOldRefreshToke;

    var errors, _req$body, oldAccessToken, oldRefreshToken, user, verifyOldRefreshTokenQuery, isValidOldRefreshToken;

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
            if (!process.env.JWT_SECRET) {
              console.error("JWT_SECRET env variable not set!");
              process.exit(1);
            }

            _req$body = req.body, oldAccessToken = _req$body.accessToken, oldRefreshToken = _req$body.refreshToken;
            _context.next = 8;
            return (0, _getUserWithAccessToken.getUserWithAccessToken)(oldAccessToken);

          case 8:
            user = _context.sent;
            _context.next = 11;
            return _db.client.query("\n      SELECT token\n      FROM refresh_tokens\n      WHERE user_id = $1 AND token = $2;\n    ", [user === null || user === void 0 ? void 0 : user.id, oldRefreshToken]);

          case 11:
            verifyOldRefreshTokenQuery = _context.sent;
            isValidOldRefreshToken = oldRefreshToken && oldRefreshToken === ((_verifyOldRefreshToke = verifyOldRefreshTokenQuery.rows[0]) === null || _verifyOldRefreshToke === void 0 ? void 0 : _verifyOldRefreshToke.token);

            if (!user || !isValidOldRefreshToken) {
              res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).send((0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.BAD_REQUEST));
            }

            _context.next = 16;
            return (0, _createJWTs.createJWTs)({
              user: user,
              res: res
            });

          case 16:
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