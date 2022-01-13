import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";

import { companiesReturnFields, companiesReturnType } from "./utils";

const router = Router();

router.get(
  "/api/v1/companies",

  async (req: express.Request<{}, any, {}>, res) => {
    const getCompaniesQuery = await client.query<companiesReturnType>(
      `
      SELECT ${companiesReturnFields.join(", ")}
      FROM companies
    `,
      []
    );
    const companies = getCompaniesQuery.rows;

    res.status(StatusCodes.OK).json(companies);
  }
);

export default router;
