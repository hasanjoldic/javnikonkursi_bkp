import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { RefreshToken } from "@javnikonkursi/shared";

import { client } from "../../../db";

import { createJWTs } from "./createJWTs";
import { getUserWithAccessToken } from "./getUserWithAccessToken";

const router = Router();
const jsonParser = json();

router.post(
  "/refresh",

  jsonParser,

  body("accessToken").isJWT(),
  body("refreshToken").isString(),

  async (
    req: express.Request<
      {},
      any,
      {
        accessToken: string;
        refreshToken: string;
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

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET env variable not set!");
      process.exit(1);
    }

    const { accessToken: oldAccessToken, refreshToken: oldRefreshToken } =
      req.body;

    const user = await getUserWithAccessToken(oldAccessToken);

    const verifyOldRefreshTokenQuery = await client.query<
      Pick<RefreshToken, "token">
    >(
      `
      SELECT token
      FROM refresh_tokens
      WHERE user_id = $1 AND token = $2;
    `,
      [user?.id, oldRefreshToken]
    );
    const isValidOldRefreshToken =
      oldRefreshToken &&
      oldRefreshToken === verifyOldRefreshTokenQuery.rows[0]?.token;

    if (!user || !isValidOldRefreshToken) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(getReasonPhrase(StatusCodes.BAD_REQUEST));
    }

    await createJWTs({
      user,
      res,
    });
  }
);

export default router;
