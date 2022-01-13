import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { client } from "../../../db";

import { companiesReturnFields, companiesReturnType } from "./utils";

const router = Router();

router.delete(
  "/api/v1/companies/:id",

  async (req: express.Request<{ id: string }, any, {}>, res) => {
    const { id } = req.params;

    const companyQuery = await client.query<companiesReturnType>(
      `
      DELETE FROM companies
      WHERE id = $1
      RETURNING ${companiesReturnFields.join(", ")}
    `,
      [id]
    );
    const company = companyQuery.rows[0];

    res.status(StatusCodes.OK).json(company);
  }
);

export default router;
