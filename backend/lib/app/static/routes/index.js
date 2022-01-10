"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var routes = [{
  method: "GET",
  path: "/{param*}",
  handler: {
    directory: {
      path: ".",
      redirectToSlash: true
    }
  },
  options: {
    auth: false,
    cors: true
  }
}, {
  method: "POST",
  path: "/create",
  handler: function handler(request, reply) {
    var payload = request.payload;
    console.log(payload);
    return "Received your data";
  },
  options: {
    payload: {
      maxBytes: 209715200,
      output: "file",
      parse: true
    }
  }
}];
var _default = routes;
exports["default"] = _default;