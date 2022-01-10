"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  client: true
};
exports.client = void 0;

var _pg = require("pg");

var _shared = require("shared");

Object.keys(_shared).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _shared[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shared[key];
    }
  });
});
var _process$env = process.env,
    POSTGRES_HOST = _process$env.POSTGRES_HOST,
    POSTGRES_PORT = _process$env.POSTGRES_PORT,
    POSTGRES_USER = _process$env.POSTGRES_USER,
    POSTGRES_PASSWORD = _process$env.POSTGRES_PASSWORD,
    POSTGRES_DB = _process$env.POSTGRES_DB;
var client = new _pg.Client({
  host: POSTGRES_HOST,
  port: Number.parseInt(POSTGRES_PORT || "5432"),
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB
});
exports.client = client;
client.connect().then(function () {
  return console.log("connected");
})["catch"](function (err) {
  return console.error("connection error", err.stack);
});