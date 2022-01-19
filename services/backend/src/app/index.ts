"use strict";

import "core-js/stable";
import "regenerator-runtime/runtime";

import "dotenv/config";

import express from "express";
import cors from "cors";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

routes.forEach(({ path, routers }) => {
  routers.forEach((router) => {
    app.use(path, router);
  });
});

const port = process.env.API_PORT || 3000;

const server = app.listen(port, () => {
  console.info(`Server listening at http://localhost:${port}`);
});

// const validate = async (
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

export * from "./routes";
export * from "./utils";
