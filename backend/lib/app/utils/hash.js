"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareHash = compareHash;
exports.hash = hash;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var saltRounds = 10;

function hash(text) {
  return _bcrypt["default"].hash(text, saltRounds);
}

function compareHash(text, hash) {
  return _bcrypt["default"].compare(text, hash);
}