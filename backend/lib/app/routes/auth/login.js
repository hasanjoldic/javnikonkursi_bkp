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
router.post("/api/v1/login", jsonParser, (0, _expressValidator.body)("email").isEmail(), (0, _expressValidator.body)("password").isLength({
  min: 10
}), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors, _req$body, email, password, loginQuery, user, isValidPassword;

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
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 7;
            return _db.client.query("\n      SELECT ".concat(_utils2.usersReturnFields.join(", "), ", password\n      FROM users\n      WHERE email = $1;\n    "), [email]);

          case 7:
            loginQuery = _context.sent;
            user = loginQuery.rows[0];

            if (!process.env.JWT_SECRET) {
              console.error("JWT_SECRET env variable not set!");
              process.exit(1);
            }

            _context.next = 12;
            return (0, _utils.compareHash)(password, user === null || user === void 0 ? void 0 : user.password);

          case 12:
            isValidPassword = _context.sent;

            if (!user || !isValidPassword) {
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