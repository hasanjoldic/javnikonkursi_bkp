import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";

import { jobTypeTagReturnFields, jobTypeTagReturnType } from "./utils";

const router = Router();

router.delete(
  "/api/v1/job_type_tags/:id",

  async (req: express.Request<{ id: string }, any, {}>, res) => {
    const { id } = req.params;

    const deleteQuery = await client.query<jobTypeTagReturnType>(
      `
      DELETE FROM job_type_tags
      WHERE id = $1
      RETURNING ${jobTypeTagReturnFields.join(", ")}
    `,
      [id]
    );
    const job = deleteQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
