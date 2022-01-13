import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";

import { jobsReturnFields, jobsReturnType } from "./utils";

const router = Router();

router.delete(
  "/api/v1/jobs/:id",

  async (req: express.Request<{ id: string }, any, {}>, res) => {
    const { id } = req.params;

    const deleteJobQuery = await client.query<jobsReturnType>(
      `
      DELETE FROM jobs
      WHERE id = $1
      RETURNING ${jobsReturnFields.join(", ")}
    `,
      [id]
    );
    const job = deleteJobQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
