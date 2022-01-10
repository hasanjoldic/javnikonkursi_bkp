import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";
import { jobTypesReturnFields, jobTypesReturnType } from "./utils";

const router = Router();

router.get(
  "/api/v1/job_types/:id",

  async (req: express.Request<{ id: string }, any, {}>, res) => {
    const { id } = req.params;

    const getOneQuery = await client.query<jobTypesReturnType>(
      `
      SELECT ${jobTypesReturnFields.join(", ")}
      FROM job_types
      WHERE id = $1;
    `,
      [id]
    );
    const job = getOneQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
