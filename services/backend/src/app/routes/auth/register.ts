import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { client } from "../../../db";

import { hash } from "../../utils";

import { createJWTs } from "./createJWTs";
import { usersReturnFields, usersReturnType } from "./utils";

const router = Router();
const jsonParser = json();

router.post(
  "/api/v1/register",

  jsonParser,

  body("email").isEmail(),
  body("fullName").isString(),
  body("password").isLength({ min: 10 }),

  async (
    req: express.Request<
      {},
      any,
      {
        email: string;
        password: string;
        fullName: string;
      }
    >,
    res
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
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
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(getReasonPhrase(StatusCodes.BAD_REQUEST));
    }

    const passwordHash = await hash(password);
    const registerUserQuery = await client.query<usersReturnType>(
      `
    INSERT INTO users (email, password, full_name)
    VALUES ($1, $2, $3)
    RETURNING ${usersReturnFields.join(", ")};
  `,
      [email, passwordHash, fullName]
    );

    const user = registerUserQuery.rows[0];
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(getReasonPhrase(StatusCodes.BAD_REQUEST));
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET env variable not set!");
      process.exit(1);
    }

    await createJWTs({
      user,
      res,
    });
  }
);

export default router;
