import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { JobTypeTag, JobTypeTagField } from "@javnikonkursi/shared";

import { client } from "../../../db";

import { jobTypesReturnFields, jobTypesReturnType } from "./utils";

const router = Router();
const jsonParser = json();

export type updateJobTypeBodyType = Pick<
  JobTypeTag,
  JobTypeTagField.title | JobTypeTagField.notes
>;

router.patch(
  "/api/v1/job_types/:id",
  jsonParser,

  body(JobTypeTagField.title).isString(),
  body(JobTypeTagField.notes).isString().optional(),

  async (
    req: express.Request<{ id: string }, any, updateJobTypeBodyType>,
    res
  ) => {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { title, notes } = req.body;

    const patchQuery = await client.query<jobTypesReturnType>(
      `
      UPDATE job_types
      SET
        title = $2,
        notes = $3
      WHERE id = $1
      RETURNING ${jobTypesReturnFields.join(", ")}
    `,
      [id, title, notes]
    );
    const job = patchQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
