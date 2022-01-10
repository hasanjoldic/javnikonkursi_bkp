import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { client, Company, CompanyField } from "../../../db";

import { companiesReturnFields, companiesReturnType } from "./utils";

const router = Router();
const jsonParser = json();

export type createCompanyBodyType = Pick<
  Company,
  CompanyField.url | CompanyField.title | CompanyField.location
>;

router.post(
  "/api/v1/companies",
  jsonParser,

  body("title").isString(),
  body("url").isURL(),
  body("location").isString().optional({ nullable: true }),

  async (req: express.Request<{}, any, createCompanyBodyType>, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { title, url, location } = req.body;

    const postCompanyQuery = await client.query<companiesReturnType>(
      `
        INSERT INTO companies (title, url, location)
        VALUES ($1, $2, $3)
        RETURNING ${companiesReturnFields.join(", ")}
      `,
      [title, url, location]
    );
    const company = postCompanyQuery.rows[0];

    res.status(StatusCodes.OK).json(company);
  }
);

export default router;
