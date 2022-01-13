import fs from "fs";
import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes } from "http-status-codes";
import { body, validationResult } from "express-validator";
import multer from "multer";
import AWS from "aws-sdk";

import { Job, JobField } from "@javnikonkursi/shared";

import { client } from "../../../db";

import { jobsReturnFields, jobsReturnType } from "./utils";

const router = Router();
const jsonParser = json();
const upload = multer();
const s3 = new AWS.S3();

export type createJobBodyType = Pick<
  Job,
  | JobField.company_id
  | JobField.job_type_id
  | JobField.title
  | JobField.location
  | JobField.start_date
  | JobField.end_date
  | JobField.external_url
> & { internalFile: File };

router.post(
  "/api/v1/jobs",
  jsonParser,

  // body(JobField.company_id).isString(),
  // body(JobField.job_type_id).isString(),
  // body(JobField.title).isString(),
  // body(JobField.location).isString().optional(),
  // body(JobField.start_date).isString(),
  // body(JobField.end_date).isString(),
  // body(JobField.external_url).isString().optional(),
  body("internalFile").isString(),

  upload.single("internalFile"),

  async (req: express.Request<{ id: string }, any, createJobBodyType>, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    // const {
    //   company_id,
    //   job_type_id,
    //   title,
    //   location,
    //   start_date,
    //   end_date,
    //   external_url,
    // } = req.body;

    // const postQuery = await client.query<jobsReturnType>(
    //   `
    //   INSERT INTO jobs as (
    //     company_id,
    //     job_type_id,
    //     title,
    //     location,
    //     start_date,
    //     end_date,
    //     external_url,
    //   )
    //   VALUES ($1, $2, $3, $4, $5, $6, $7)
    //   RETURNING ${jobsReturnFields.join(", ")}
    // `,
    //   [
    //     company_id,
    //     job_type_id,
    //     title,
    //     location,
    //     start_date,
    //     end_date,
    //     external_url,
    //   ]
    // );
    // const job = postQuery.rows[0];

    // if (job && req.file?.path) {
    //   const ext = req.file.originalname.split(".").reverse()[0];
    //   const s3FileName = `${job.id}.${ext}`;
    //   const upload = await s3
    //     .putObject({
    //       Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    //       Key: s3FileName,
    //       Body: fs.createReadStream(req.file?.path, "utf8"),
    //       ACL: "public-read",
    //     })
    //     .promise();
    //   if (upload.$response.error) {
    //     console.error(upload.$response.error);
    //   } else {
    //     const s3PublicPath = `${process.env.AWS_S3_PUBLIC_URL}/${s3FileName}`;
    //     const addInternalUrlQuery = await client.query<
    //       Pick<Job, JobField.internal_url>
    //     >(
    //       `
    //       UPDATE jobs
    //       SET internal_url = $2
    //       WHERE id = $1
    //       RETURNING internal_url
    //     `,
    //       [job.id, s3PublicPath]
    //     );

    //     res.status(StatusCodes.OK).json({
    //       ...job,
    //       internal_url: addInternalUrlQuery.rows?.[0]?.internal_url,
    //     });
    //     return;
    //   }
    // }

    // const ext = req.file.originalname.split(".").reverse()[0];
    // const s3FileName = `${job.id}.${ext}`;
    // const upload = await s3
    //   .putObject({
    //     Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    //     Key: s3FileName,
    //     Body: fs.createReadStream(req.file?.path, "utf8"),
    //     ACL: "public-read",
    //   })
    //   .promise();
    // if (upload.$response.error) {
    //   console.error(upload.$response.error);
    // } else {
    //   const s3PublicPath = `${process.env.AWS_S3_PUBLIC_URL}/${s3FileName}`;
    //   const addInternalUrlQuery = await client.query<
    //     Pick<Job, JobField.internal_url>
    //   >(
    //     `
    //       UPDATE jobs
    //       SET internal_url = $2
    //       WHERE id = $1
    //       RETURNING internal_url
    //     `,
    //     [job.id, s3PublicPath]
    //   );

    //   res.status(StatusCodes.OK).json({
    //     ...job,
    //     internal_url: addInternalUrlQuery.rows?.[0]?.internal_url,
    //   });
    //   return;
    // }

    // res.status(StatusCodes.OK).json(job);
    res.status(StatusCodes.OK);
  }
);

export default router;
