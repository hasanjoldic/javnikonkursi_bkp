"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserWithAccessToken = getUserWithAccessToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = require("../../../db");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getUserWithAccessToken(_x) {
  return _getUserWithAccessToken.apply(this, arguments);
}

function _getUserWithAccessToken() {
  _getUserWithAccessToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accessToken) {
    var decoded, userId, userQuery;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!process.env.JWT_SECRET) {
              console.error("JWT_SECRET env variable not set!");
              process.exit(1);
            }

            decoded = _jsonwebtoken["default"].verify(accessToken, process.env.JWT_SECRET);
            userId = decoded === null || decoded === void 0 ? void 0 : decoded.user_id;
            _context.next = 5;
            return _db.client.query("\n    SELECT ".concat(_utils.usersReturnFields.join(", "), "\n    FROM users\n    WHERE id = $1;\n  "), [userId]);

          case 5:
            userQuery = _context.sent;
            return _context.abrupt("return", userQuery.rows[0]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getUserWithAccessToken.apply(this, arguments);
}