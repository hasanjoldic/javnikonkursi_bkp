import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { IRegisterRequestBody } from "@javnikonkursi/shared";

import { client, insertUser } from "db";

import { createJWTs } from "./createJWTs";

const router = Router();
const jsonParser = json();

export const registerValidators = [
  body("email").isEmail(),
  body("fullName").isString(),
  body("password").isLength({ min: 8 }).withMessage("Password minimum length is 8."),
];

export const registerHandler = async (req: express.Request<{}, any, IRegisterRequestBody>, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.UNAUTHORIZED).json({ errors: errors.array() });
    return;
  }

  const { email, password, fullName } = req.body;

  const whitelistedEmailQuery = await client.query<{ email: string }>(
    `
    SELECT email
    FROM whitelisted_emails
    WHERE email = $1;
  `,
    [email]
  );

  const isEmailWhitelisted = whitelistedEmailQuery.rows.length === 1;

  const userQuery = await client.query(
    `
      SELECT id
      FROM users
      WHERE email = $1;
    `,
    [email]
  );
  const doesUserAlreadyExist = userQuery.rows.length === 1;

  if (!isEmailWhitelisted || doesUserAlreadyExist) {
    res.status(StatusCodes.UNAUTHORIZED).send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    return;
  }

  const insertUserQuery = await insertUser({
    email,
    password,
    fullName,
  });

  const user = insertUserQuery.rows[0];
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    return;
  }

  await createJWTs({
    user,
    res,
  });
};

router.post(
  "/v1/register",

  jsonParser,
  registerValidators,
  registerHandler
);

export default router;
