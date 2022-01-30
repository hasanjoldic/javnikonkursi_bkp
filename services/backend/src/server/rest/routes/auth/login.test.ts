import { app } from "app";
import { deleteUser, deleteWhitelistedEmail, insertUser, insertWhitelistedEmail } from "db";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import supertest from "supertest";

import { testExpressValidatorMiddleware, setup } from "testUtils";
import { loginHandler, loginValidators } from "./login";

const request = supertest(app);

const userNotWhitelisted = {
  email: "__test__user_not_whitelisted@test.com",
  password: "a_valid_password",
  fullName: "Not whitelisted",
};

const userWhitelisted = {
  email: "__test__user@test.com",
  password: "a_valid_password",
  fullName: "Whitelisted",
};

beforeAll(async () => {
  await deleteUser(userNotWhitelisted.email);
  await deleteUser(userWhitelisted.email);
  await insertUser(userNotWhitelisted);
  await insertUser(userWhitelisted);
  await deleteWhitelistedEmail(userWhitelisted.email);
  await insertWhitelistedEmail(userWhitelisted.email);
});

afterAll(async () => {
  await deleteUser(userNotWhitelisted.email);
  await deleteUser(userWhitelisted.email);
  await deleteWhitelistedEmail(userWhitelisted.email);
});

describe("POST /api/v1/login handler", () => {
  test("Empty request body", async (done) => {
    const { req, res } = setup();

    await testExpressValidatorMiddleware(req as any, res as unknown as Response, loginValidators);
    await loginHandler(req as Request, res);

    const errors = validationResult(req).array();

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ errors });
    expect(res.send).not.toHaveBeenCalled();

    expect(errors?.length).toBe(2);
    const [emailError, passwordError] = errors;
    expect(emailError?.param).toBe("email");
    expect(emailError?.msg).toBe("Invalid value");
    expect(passwordError?.param).toBe("password");
    expect(passwordError?.msg).toBe("Password minimum length is 8.");

    done();
  });

  test("User doesn't exist", async (done) => {
    const { req, res } = setup({
      email: "__test__user_doesnt_exist@test.com",
      password: "__test__a_valid_password",
    });

    await testExpressValidatorMiddleware(req as any, res as unknown as Response, loginValidators);
    await loginHandler(req as Request, res);

    const errors = validationResult(req).array();
    expect(errors?.length).toBe(0);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.send).toHaveBeenCalledWith(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    expect(res.json).not.toHaveBeenCalled();

    done();
  });

  test("User not whitelisted", async (done) => {
    const { req, res } = setup({
      email: userNotWhitelisted.email,
      password: userNotWhitelisted.password,
    });

    await testExpressValidatorMiddleware(req as any, res as unknown as Response, loginValidators);
    await loginHandler(req as Request, res);

    const errors = validationResult(req).array();
    expect(errors?.length).toBe(0);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.send).toHaveBeenCalledWith(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    expect(res.json).not.toHaveBeenCalled();

    done();
  });

  test("Incorrect password", async (done) => {
    const { req, res } = setup({
      email: userWhitelisted.email,
      password: "incorrect_password",
    });

    await testExpressValidatorMiddleware(req as any, res as unknown as Response, loginValidators);
    await loginHandler(req as Request, res);

    const errors = validationResult(req).array();
    expect(errors?.length).toBe(0);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.send).toHaveBeenCalledWith(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    expect(res.json).not.toHaveBeenCalled();

    done();
  });

  test("Valid request", async (done) => {
    const { req, res } = setup({
      email: userWhitelisted.email,
      password: userWhitelisted.password,
    });

    await testExpressValidatorMiddleware(req as any, res as unknown as Response, loginValidators);
    await loginHandler(req as Request, res);

    const errors = validationResult(req).array();
    expect(errors?.length).toBe(0);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      user: {
        id: expect.any(String),
        email: userWhitelisted.email,
        fullName: userWhitelisted.fullName,
        role: expect.any(String),
      },
      accessToken: expect.any(String),
    });
    expect(res.send).not.toHaveBeenCalled();

    done();
  });
});

describe("POST /api/v1/login", () => {
  test("Login with empty request body", async (done) => {
    const res = await request
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .expect(StatusCodes.UNAUTHORIZED)
      .expect("Content-Type", /application\/json/);

    expect(res.body.errors?.length).toBe(2);
    const [emailError, passwordError] = res.body.errors || [{}, {}];
    expect(emailError?.param).toBe("email");
    expect(emailError?.msg).toBe("Invalid value");
    expect(passwordError?.param).toBe("password");
    expect(passwordError?.msg).toBe("Password minimum length is 8.");

    done();
  });

  test("User not whitelisted", async (done) => {
    const res = await request
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send({
        email: userNotWhitelisted.email,
        password: userNotWhitelisted.password,
      })
      .expect(StatusCodes.UNAUTHORIZED);

    expect(res.text).toBe(getReasonPhrase(StatusCodes.UNAUTHORIZED));

    expect(res.body.errors).toBeUndefined();

    done();
  });

  test("Valid request", async (done) => {
    const res = await request
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send({
        email: userWhitelisted.email,
        password: userWhitelisted.password,
      })
      .expect(StatusCodes.OK)
      .expect("Content-Type", /application\/json/);

    expect(res.body.errors).toBeUndefined();

    done();
  });
});
