import { Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

import {
  client,
  TimestampField,
  User,
  RefreshToken,
  UserField,
} from "../../../db";

export async function createJWTs({
  user,
  res,
  oldRefreshToken,
}: {
  user: Pick<
    User,
    TimestampField.id | UserField.email | UserField.full_name | UserField.role
  >;
  res: Response;
  oldRefreshToken?: string;
}) {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET env variable not set!");
    process.exit(1);
  }

  const newAccessToken = jsonwebtoken.sign(
    { user_id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      // audience: process.env.JWT_AUDIENCE,
      expiresIn: "10m",
    }
  );

  const newRefreshToken = crypto.randomBytes(64).toString("hex");

  const createNewRefreshToken = await client.query<Pick<RefreshToken, "token">>(
    `
    INSERT INTO refresh_tokens (user_id, token)
    VALUES ($1, $2)
    RETURNING token;
  `,
    [user.id, newRefreshToken]
  );

  if (!createNewRefreshToken.rowCount) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(getReasonPhrase(StatusCodes.BAD_REQUEST));
    return;
  }

  if (oldRefreshToken) {
    await client.query(
      `
      DELETE FROM refresh_tokens
      WHERE user_id = $1 AND token = $2;
    `,
      [user.id, oldRefreshToken]
    );
  }

  const isValidNewRefreshToken =
    newRefreshToken && newRefreshToken === createNewRefreshToken.rows[0]?.token;

  if (!isValidNewRefreshToken) {
    await client.query(
      `
      DELETE FROM refresh_tokens
      WHERE user_id = $1 AND token = $2;
    `,
      [user.id, newRefreshToken]
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .send(getReasonPhrase(StatusCodes.BAD_REQUEST));
    return;
  }

  res.status(StatusCodes.OK).json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
    },
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
}
