import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";
import { jobTypeTagReturnFields, jobTypeTagReturnType } from "./utils";

const router = Router();

router.get(
  "/api/v1/job_type_tags/:id",

  async (req: express.Request<{ id: string }, any, {}>, res) => {
    const { id } = req.params;

    const getOneQuery = await client.query<jobTypeTagReturnType>(
      `
      SELECT ${jobTypeTagReturnFields.join(", ")}
      FROM job_type_tags
      WHERE id = $1;
    `,
      [id]
    );
    const job = getOneQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
