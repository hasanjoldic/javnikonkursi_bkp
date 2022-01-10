import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { client, JobTypeTag, JobTypeTagField } from "../../../db";

import { jobTypesReturnFields, jobTypesReturnType } from "./utils";

const router = Router();
const jsonParser = json();

export type createJobTypeBodyType = Pick<
  JobTypeTag,
  JobTypeTagField.title | JobTypeTagField.notes
>;

router.post(
  "/api/v1/job_types",
  jsonParser,

  body(JobTypeTagField.title).isString(),
  body(JobTypeTagField.notes).isString().optional(),

  async (
    req: express.Request<{ id: string }, any, createJobTypeBodyType>,
    res
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { title, notes } = req.body;

    const postQuery = await client.query<jobTypesReturnType>(
      `
      INSERT INTO job_types (title, notes)
      VALUES ($1, $2)
      RETURNING ${jobTypesReturnFields.join(", ")}
    `,
      [title, notes]
    );
    const job = postQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
