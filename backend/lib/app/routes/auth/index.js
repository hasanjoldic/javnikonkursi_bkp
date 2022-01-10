"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _login = _interopRequireDefault(require("./login"));

var _logout = _interopRequireDefault(require("./logout"));

var _refresh = _interopRequireDefault(require("./refresh"));

var _register = _interopRequireDefault(require("./register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  path: "/",
  routers: [_login["default"], _logout["default"], _refresh["default"], _register["default"]]
};
exports["default"] = _default;