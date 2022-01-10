import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";

import { companiesReturnFields, companiesReturnType } from "./utils";

const router = Router();

router.get(
  "/api/v1/companies/:id",

  async (req: express.Request<{ id: string }, any, {}>, res) => {
    const { id } = req.params;

    const getOneCompanyQuery = await client.query<companiesReturnType>(
      `
      SELECT ${companiesReturnFields.join(", ")}
      FROM companies
      WHERE id = $1;
    `,
      [id]
    );
    const company = getOneCompanyQuery.rows[0];

    res.status(StatusCodes.OK).json(company);
  }
);

export default router;
