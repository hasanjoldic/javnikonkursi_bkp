import express, { request, Router } from "express";
import { json } from "body-parser";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { ILoginRequestBody } from "@javnikonkursi/shared";

import { compareHash } from "utils";
import { client } from "db";

import { createJWTs } from "./createJWTs";
import { dbUserReturnColumns, IDBUser } from "./types";

const router = Router();
const jsonParser = json();

export const loginValidators = [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password minimum length is 8."),
];

export const loginHandler = async (req: express.Request<{}, any, ILoginRequestBody>, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.UNAUTHORIZED).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  const whitelistedEmailQuery = await client.query<{ email: string }>(
    `
      SELECT email
      FROM whitelisted_emails
      WHERE email = $1;
    `,
    [email]
  );

  const isEmailWhitelisted = whitelistedEmailQuery.rows.length === 1;

  const getUserQuery = await client.query<IDBUser>(
    `
      SELECT ${dbUserReturnColumns.join(", ")}
      FROM users
      WHERE email = $1;
    `,
    [email]
  );
  const user = getUserQuery.rows[0];

  if (!isEmailWhitelisted || !user) {
    res.status(StatusCodes.UNAUTHORIZED).send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    return;
  }

  const isValidPassword = await compareHash(password, user?.password);

  if (!isValidPassword) {
    res.status(StatusCodes.UNAUTHORIZED).send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    return;
  }

  await createJWTs({
    user,
    res,
  });
};

router.post("/v1/login", jsonParser, ...loginValidators, loginHandler);

export default router;
