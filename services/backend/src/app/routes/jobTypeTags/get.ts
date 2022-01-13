import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";

import { jobTypeTagReturnFields, jobTypeTagReturnType } from "./utils";

const router = Router();

router.get(
  "/api/v1/job_type_tags",

  async (req: express.Request<{}, any, {}>, res) => {
    const getQuery = await client.query<jobTypeTagReturnType>(
      `
      SELECT ${jobTypeTagReturnFields.join(", ")}
      FROM job_type_tags;
    `,
      []
    );
    const jobs = getQuery.rows;

    res.status(StatusCodes.OK).json(jobs);
  }
);

export default router;
