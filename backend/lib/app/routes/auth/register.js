"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _bodyParser = require("body-parser");

var _httpStatusCodes = require("http-status-codes");

var _expressValidator = require("express-validator");

var _utils = require("../../utils");

var _db = require("../../../db");

var _createJWTs = require("./createJWTs");

var _utils2 = require("./utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
var jsonParser = (0, _bodyParser.json)();
router.post("/api/v1/register", jsonParser, (0, _expressValidator.body)("email").isEmail(), (0, _expressValidator.body)("fullName").isString(), (0, _expressValidator.body)("password").isLength({
  min: 10
}), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors, _req$body, email, password, fullName, whitelistedEmailQuery, isEmailWhitelisted, userQuery, doesUserAlreadyExist, passwordHash, registerUserQuery, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              errors: errors.array()
            }));

          case 3:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, fullName = _req$body.fullName;
            _context.next = 6;
            return _db.client.query("\n      SELECT email\n      FROM whitelisted_emails\n      WHERE email = $1;\n    ", [email]);

          case 6:
            whitelistedEmailQuery = _context.sent;
            isEmailWhitelisted = whitelistedEmailQuery.rows.length === 1;
            _context.next = 10;
            return _db.client.query("\n    SELECT id\n    FROM users\n    WHERE email = $1;\n  ", [email]);

          case 10:
            userQuery = _context.sent;
            doesUserAlreadyExist = userQuery.rows.length === 1;

            if (!isEmailWhitelisted || doesUserAlreadyExist) {
              res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).send((0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.BAD_REQUEST));
            }

            _context.next = 15;
            return (0, _utils.hash)(password);

          case 15:
            passwordHash = _context.sent;
            _context.next = 18;
            return _db.client.query("\n    INSERT INTO users (email, password, full_name)\n    VALUES ($1, $2, $3)\n    RETURNING ".concat(_utils2.usersReturnFields.join(", "), ";\n  "), [email, passwordHash, fullName]);

          case 18:
            registerUserQuery = _context.sent;
            user = registerUserQuery.rows[0];

            if (!user) {
              res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).send((0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.BAD_REQUEST));
            }

            if (!process.env.JWT_SECRET) {
              console.error("JWT_SECRET env variable not set!");
              process.exit(1);
            }

            _context.next = 24;
            return (0, _createJWTs.createJWTs)({
              user: user,
              res: res
            });

          case 24:
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