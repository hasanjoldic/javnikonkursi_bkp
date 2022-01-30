import express from "express";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

import { routes } from "server/rest";

export const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

routes.forEach(({ path, routers }) => {
  routers.forEach((router) => {
    app.use(`/api${path}`, router);
  });
});

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}

app.use(errorHandler);
