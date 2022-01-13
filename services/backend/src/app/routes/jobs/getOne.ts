import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";
import { jobsReturnFields, jobsReturnType } from "./utils";

const router = Router();

router.get(
  "/api/v1/jobs/:id",

  async (req: express.Request<{ id: string }, any, {}>, res) => {
    const { id } = req.params;

    const getOneJobQuery = await client.query<jobsReturnType>(
      `
      SELECT ${jobsReturnFields.join(", ")}
      FROM jobs
      WHERE id = $1;
    `,
      [id]
    );
    const job = getOneJobQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
