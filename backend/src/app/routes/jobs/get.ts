import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";

import { jobsReturnFields, jobsReturnType } from "./utils";

const router = Router();

router.get(
  "/api/v1/jobs",

  async (req: express.Request<{}, any, {}>, res) => {
    const getJobsQuery = await client.query<jobsReturnType>(
      `
      SELECT ${jobsReturnFields.join(", ")}
      FROM jobs;
    `,
      []
    );
    const jobs = getJobsQuery.rows;

    res.status(StatusCodes.OK).json(jobs);
  }
);

export default router;
