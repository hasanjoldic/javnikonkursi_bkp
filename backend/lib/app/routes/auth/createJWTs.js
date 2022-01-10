"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJWTs = createJWTs;

var _httpStatusCodes = require("http-status-codes");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _crypto = _interopRequireDefault(require("crypto"));

var _db = require("../../../db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createJWTs(_x) {
  return _createJWTs.apply(this, arguments);
}

function _createJWTs() {
  _createJWTs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var _createNewRefreshToke;

    var user, res, oldRefreshToken, newAccessToken, newRefreshToken, createNewRefreshToken, isValidNewRefreshToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref.user, res = _ref.res, oldRefreshToken = _ref.oldRefreshToken;

            if (!process.env.JWT_SECRET) {
              console.error("JWT_SECRET env variable not set!");
              process.exit(1);
            }

            newAccessToken = _jsonwebtoken["default"].sign({
              user_id: user.id,
              role: user.role
            }, process.env.JWT_SECRET, {
              // audience: process.env.JWT_AUDIENCE,
              expiresIn: "10m"
            });
            newRefreshToken = _crypto["default"].randomBytes(64).toString("hex");
            _context.next = 6;
            return _db.client.query("\n    INSERT INTO refresh_tokens (user_id, token)\n    VALUES ($1, $2)\n    RETURNING token;\n  ", [user.id, newRefreshToken]);

          case 6:
            createNewRefreshToken = _context.sent;

            if (createNewRefreshToken.rowCount) {
              _context.next = 10;
              break;
            }

            res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).send((0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.BAD_REQUEST));
            return _context.abrupt("return");

          case 10:
            if (!oldRefreshToken) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return _db.client.query("\n      DELETE FROM refresh_tokens\n      WHERE user_id = $1 AND token = $2;\n    ", [user.id, oldRefreshToken]);

          case 13:
            isValidNewRefreshToken = newRefreshToken && newRefreshToken === ((_createNewRefreshToke = createNewRefreshToken.rows[0]) === null || _createNewRefreshToke === void 0 ? void 0 : _createNewRefreshToke.token);

            if (isValidNewRefreshToken) {
              _context.next = 19;
              break;
            }

            _context.next = 17;
            return _db.client.query("\n      DELETE FROM refresh_tokens\n      WHERE user_id = $1 AND token = $2;\n    ", [user.id, newRefreshToken]);

          case 17:
            res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).send((0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.BAD_REQUEST));
            return _context.abrupt("return");

          case 19:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              user: {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                role: user.role
              },
              accessToken: newAccessToken,
              refreshToken: newRefreshToken
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createJWTs.apply(this, arguments);
}