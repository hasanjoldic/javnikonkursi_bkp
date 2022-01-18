import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes } from "http-status-codes";
import { body, validationResult } from "express-validator";

import {
  JobTypeTagField,
  createJobTypeTagBodyType,
} from "@javnikonkursi/shared";

import { client } from "../../../db";

import { jobTypeTagReturnFields, jobTypeTagReturnType } from "./utils";

const router = Router();
const jsonParser = json();

router.post(
  "/api/v1/job_type_tags",
  jsonParser,

  body(JobTypeTagField.title).isString(),
  body(JobTypeTagField.notes).isString().optional(),

  async (
    req: express.Request<{ id: string }, any, createJobTypeTagBodyType>,
    res
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { title, notes } = req.body;

    const postQuery = await client.query<jobTypeTagReturnType>(
      `
      INSERT INTO job_type_tags (title, notes)
      VALUES ($1, $2)
      RETURNING ${jobTypeTagReturnFields.join(", ")}
    `,
      [title, notes]
    );
    const job = postQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
