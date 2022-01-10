import { Request, ServerRoute } from "@hapi/hapi";
import joi from "@hapi/joi";
import * as Bcrypt from "bcrypt";

import pg from "../../db/index";
import { generateToken } from "../util/token";
import { IUser } from "../../db/schemas";

interface ILoginPayload {
  email: string;
  password: string;
}

const route: ServerRoute = {
  method: "POST",
  path: "/api/v1/login",
  handler: async function (request: Request, h) {
    const { email, password } = request.payload as ILoginPayload;
    console.log("Logging in with: ", { email, password });

    try {
      const user = await pg<IUser>("users").where({ email }).first();
      console.log("Comparing: ", { password, hash: user?.password });

      const isValid = await Bcrypt.compare(password, user?.password as string);
      const isUserEnabled = user?.is_email_verified;

      if (isValid && isUserEnabled) {
        console.log("Password is valid and user is enabled");
        const authToken = generateToken({ email });
        return h.response({ email, authToken }).code(201);
      } else {
        console.log("Password is NOT valid");
        return h.response().code(401);
      }
    } catch (err) {
      console.log(err);
      return h.response().code(401);
    }
  },
  options: {
    auth: false,
    validate: {
      payload: joi.object({
        email: joi.string().email(),
        password: joi.string().min(8),
      }),
    },
  },
};

export default route;
