import { Request, ServerRoute } from "@hapi/hapi";
import joi from "@hapi/joi";
import * as Bcrypt from "bcrypt";

import pg from "../../db/index";

const saltRounds = 10;

interface IRegisterPayload {
  email: string;
  password: string;
}

const route: ServerRoute = {
  method: "POST",
  path: "/api/v1/register",
  handler: async function (request: Request, h) {
    const { email, password } = request.payload as IRegisterPayload;
    try {
      const hash = await Bcrypt.hash(password, saltRounds);
      console.log("Created a hash", {
        password,
        hash,
      });
      const [response] = await pg("users")
        .insert({
          email,
          password: hash,
        })
        .returning(["email"]);

      console.log(response);
      return h.response(response).code(201);
    } catch (err) {
      if (err.code === "23505") {
        return h.response("Email vec postoji").code(403);
      }
      console.log(JSON.stringify(err, null, 4));
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
