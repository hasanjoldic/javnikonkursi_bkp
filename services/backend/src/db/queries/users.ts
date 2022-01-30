import { hash } from "utils";
import { client } from "db";

import { dbUserReturnColumns, IDBUser } from "server/rest/routes/auth/types";
import { query } from "express";

export async function insertUser({ email, password, fullName }: { email: string; password: string; fullName: string }) {
  const passwordHash = await hash(password);

  return await client.query<IDBUser>(
    `
      INSERT INTO users (email, password, full_name)
      VALUES ($1, $2, $3)
      RETURNING ${dbUserReturnColumns.join(", ")};
    `,
    [email, passwordHash, fullName]
  );
}

export async function deleteUser(email: string) {
  return await client.query(
    `
      DELETE FROM users
      WHERE email = $1;
    `,
    [email]
  );
}

export async function insertWhitelistedEmail(email: string) {
  return client.query<{ email: string }>(
    `
      INSERT INTO whitelisted_emails (email)
      VALUES ($1); 
    `,
    [email]
  );
}

export async function deleteWhitelistedEmail(email: string) {
  return client.query(
    `
      DELETE FROM whitelisted_emails
      WHERE email = $1;
    `,
    [email]
  );
}
