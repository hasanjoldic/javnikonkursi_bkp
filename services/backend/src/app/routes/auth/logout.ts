import express, { Router } from "express";
import { json } from "body-parser";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { body, validationResult } from "express-validator";

import { client } from "../../../db";

import { getUserWithAccessToken } from "./getUserWithAccessToken";

const router = Router();
const jsonParser = json();

router.post(
  "/logout",

  jsonParser,

  body("accessToken").isJWT(),
  body("refreshToken").isString(),
  body("shouldInvalidateAllJWTs").isBoolean(),

  async (
    req: express.Request<
      {},
      any,
      {
        accessToken: string;
        refreshToken: string;
        shouldInvalidateAllJWTs: boolean;
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

    const { accessToken, refreshToken, shouldInvalidateAllJWTs } = req.body;

    const user = await getUserWithAccessToken(accessToken);

    if (!user) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    }

    if (shouldInvalidateAllJWTs) {
      await client.query(
        `
          DELETE FROM refresh_tokens
          WHERE user_id = $1;
        `,
        [user.id]
      );
    } else {
      if (!refreshToken) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(getReasonPhrase(StatusCodes.BAD_REQUEST));
      }
      await client.query(
        `
          DELETE FROM refresh_tokens
          WHERE token = $1;
        `,
        [refreshToken]
      );
    }

    res.status(StatusCodes.OK).send(getReasonPhrase(StatusCodes.OK));
  }
);

export default router;
