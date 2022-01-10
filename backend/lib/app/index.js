"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json({
  limit: "10mb"
}));

_routes["default"].forEach(function (_ref) {
  var path = _ref.path,
      routers = _ref.routers;
  routers.forEach(function (router) {
    app.use(path, router);
  });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.info("Server listening at http://localhost:".concat(port));
}); // const validate = async (
//   decoded: { email: string },
//   request: Request,
//   h: ResponseToolkit
// ) => {
//   const userQuery = await client.query<Pick<IUser, "id" | "email">>(
//     `
//     SELECT id, email
//     FROM users
//     WHERE email = $1;
//   `,
//     [decoded?.email]
//   );
//   const user = userQuery?.rows?.[0];
//   if (!user) {
//     return { credentials: null, isValid: false };
//   }
//   const credentials = { id: user.id, email: user.email };
//   return { isValid: true, credentials };
// };
// const init = async () => {
//   const server = Hapi.server({
//     port: process.env.PORT,
//     host: process.env.HOST,
//     routes: {
//       cors: true,
//       files: {
//         relativeTo: path.join(__dirname, "../../public"),
//       },
//     },
//   });
//   await server.register(require("hapi-auth-jwt2"));
//   await server.register(require("@hapi/inert"));
//   server.auth.strategy("jwt", "jwt", {
//     key: process.env.JWT_KEY,
//     validate,
//   });
//   server.auth.default("jwt");
//   routes.forEach((route) => {
//     console.log(route.method, route.path);
//     server.route(route);
//   });
//   await server.start();
//   console.log("Server running on %s", server.info.uri);
// };
// process.on("unhandledRejection", (err) => {
//   console.log(err);
//   // process.exit(1);
// });
// init();