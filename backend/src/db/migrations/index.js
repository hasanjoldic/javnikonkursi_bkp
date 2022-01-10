"use strict";

require("core-js/stable");
require("regenerator-runtime/runtime");

const { migrate } = require("postgres-migrations");

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

(async function migrateUp() {
  const dbConfig = {
    host: POSTGRES_HOST || "172.19.0.2",
    port: Number.parseInt(POSTGRES_PORT || "5432"),
    user: POSTGRES_USER || "postgres",
    password: POSTGRES_PASSWORD || "postgres",
    database: POSTGRES_DB || "postgres",

    // Default: false for backwards-compatibility
    // This might change!
    ensureDatabaseExists: true,

    // Default: "postgres"
    // Used when checking/creating "database-name"
    defaultDatabase: "postgres",
  };

  await migrate(dbConfig, "./up");
})();
