"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var secondsIn30Days = 30 * 86400;

var generateToken = function generateToken(payload) {
  return _jsonwebtoken["default"].sign(payload, process.env.JWT_KEY, {
    expiresIn: secondsIn30Days
  }); // secret is defined in the environment variable JWT_SECRET
};

exports.generateToken = generateToken;