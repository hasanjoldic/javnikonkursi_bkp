import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";

import { jobTypesReturnFields, jobTypesReturnType } from "./utils";

const router = Router();

router.get(
  "/api/v1/job_types",

  async (req: express.Request<{}, any, {}>, res) => {
    const getQuery = await client.query<jobTypesReturnType>(
      `
      SELECT ${jobTypesReturnFields.join(", ")}
      FROM job_types;
    `,
      []
    );
    const jobs = getQuery.rows;

    res.status(StatusCodes.OK).json(jobs);
  }
);

export default router;
