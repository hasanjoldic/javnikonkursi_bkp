import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { client } from "../../../db";

import { companiesReturnFields, companiesReturnType } from "./utils";

const router = Router();
const jsonParser = json();

router.patch(
  "/api/v1/companies/:id",
  jsonParser,

  body("title").isString(),
  body("url").isURL(),
  body("location").isString(),

  async (req: express.Request<{ id: string }, any>, res) => {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { title, url, location } = req.body;

    const patchCompanyQuery = await client.query<companiesReturnType>(
      `
      UPDATE companies
      VALUES ($2, $3, $4)
      SET
        title = $2,
        url = $3,
        location = $4
      WHERE id = $1
      RETURNING ${companiesReturnFields.join(", ")}
    `,
      [id, title, url, location]
    );
    const company = patchCompanyQuery.rows[0];

    res.status(StatusCodes.OK).json(company);
  }
);

export default router;
