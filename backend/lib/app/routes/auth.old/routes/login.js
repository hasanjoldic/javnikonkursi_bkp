"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var Bcrypt = _interopRequireWildcard(require("bcrypt"));

var _index = _interopRequireDefault(require("../../db/index"));

var _token = require("../util/token");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var route = {
  method: "POST",
  path: "/api/v1/login",
  handler: function () {
    var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, h) {
      var _ref, email, password, user, isValid, isUserEnabled, authToken;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref = request.payload, email = _ref.email, password = _ref.password;
              console.log("Logging in with: ", {
                email: email,
                password: password
              });
              _context.prev = 2;
              _context.next = 5;
              return (0, _index["default"])("users").where({
                email: email
              }).first();

            case 5:
              user = _context.sent;
              console.log("Comparing: ", {
                password: password,
                hash: user === null || user === void 0 ? void 0 : user.password
              });
              _context.next = 9;
              return Bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);

            case 9:
              isValid = _context.sent;
              isUserEnabled = user === null || user === void 0 ? void 0 : user.is_email_verified;

              if (!(isValid && isUserEnabled)) {
                _context.next = 17;
                break;
              }

              console.log("Password is valid and user is enabled");
              authToken = (0, _token.generateToken)({
                email: email
              });
              return _context.abrupt("return", h.response({
                email: email,
                authToken: authToken
              }).code(201));

            case 17:
              console.log("Password is NOT valid");
              return _context.abrupt("return", h.response().code(401));

            case 19:
              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](2);
              console.log(_context.t0);
              return _context.abrupt("return", h.response().code(401));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 21]]);
    }));

    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }(),
  options: {
    auth: false,
    validate: {
      payload: _joi["default"].object({
        email: _joi["default"].string().email(),
        password: _joi["default"].string().min(8)
      })
    }
  }
};
var _default = route;
exports["default"] = _default;