import fs from "fs";
import { Request, ServerRoute } from "@hapi/hapi";

const routes: ServerRoute[] = [
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
      },
    },
    options: {
      auth: false,
      cors: true,
    },
  },
  {
    method: "POST",
    path: "/create",
    handler: function (request: Request, reply) {
      const payload = request.payload;
      console.log(payload);
      return "Received your data";
    },
    options: {
      payload: {
        maxBytes: 209715200,
        output: "file",
        parse: true,
      },
    },
  },
];

export default routes;
