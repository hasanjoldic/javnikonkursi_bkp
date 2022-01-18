import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { JobField, updateJobBodyType } from "@javnikonkursi/shared";

import { client } from "../../../db";

import { jobsReturnFields, jobsReturnType } from "./utils";

const router = Router();
const jsonParser = json();

router.patch(
  "/api/v1/jobs/:id",
  jsonParser,

  body(JobField.company_id).isString(),
  body(JobField.job_type_id).isString(),
  body(JobField.title).isString(),
  body(JobField.location).isString().optional(),
  body(JobField.start_date).isString(),
  body(JobField.end_date).isString(),
  body(JobField.external_url).isString().optional(),
  body(JobField.internal_url).isString(),

  async (req: express.Request<{ id: string }, any, updateJobBodyType>, res) => {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const {
      company_id,
      job_type_id,
      title,
      location,
      start_date,
      end_date,
      external_url,
      internal_url,
    } = req.body;

    const patchJobQuery = await client.query<jobsReturnType>(
      `
      UPDATE companies
      SET
        company_id = $2,
        job_type_id = $3,
        title = $4,
        location = $5,
        start_date = $6,
        end_date = $7,
        external_url = $8,
        internal_url = $9
      WHERE id = $1
      RETURNING ${jobsReturnFields.join(", ")}
    `,
      [
        id,
        company_id,
        job_type_id,
        title,
        location,
        start_date,
        end_date,
        external_url,
        internal_url,
      ]
    );
    const job = patchJobQuery.rows[0];

    res.status(StatusCodes.OK).json(job);
  }
);

export default router;
