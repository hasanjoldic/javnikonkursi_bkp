"use strict";

require("core-js/stable");
require("regenerator-runtime/runtime");

import { Client } from "pg";

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const config = {
  host: POSTGRES_HOST,
  port: Number.parseInt(POSTGRES_PORT || "5432"),
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
};

const client = new Client(config);

client
  .connect()
  .then(() => {
    console.info(`Connected to database ${config.user}@${config.host}:${config.port}`);
  })
  .catch((err) => console.error("connection error", err.stack));
