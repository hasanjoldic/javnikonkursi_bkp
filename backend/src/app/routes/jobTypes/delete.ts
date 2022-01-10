import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";

import { jobTypesReturnFields, jobTypesReturnType } from "./utils";

const router = Router();

router.delete(
  "/api/v1/job_types/:id",

  async (req: express.Request<{ id: string }, any, {}>, res) => {
    const { id } = req.params;

    const deleteQuery = await client.query<jobTypesReturnType>(
      `
      DELETE FROM job_types
      WHERE id = $1
      RETURNING ${jobTypesReturnFields.join(", ")}
    `,
      [id]
    );
    const job = deleteQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
