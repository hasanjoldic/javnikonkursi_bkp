import { app } from "app";
import { deleteUser, deleteWhitelistedEmail, insertUser, insertWhitelistedEmail } from "db";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import supertest from "supertest";

import { testExpressValidatorMiddleware, setup } from "testUtils";
import { registerHandler, registerValidators } from "./register";

const request = supertest(app);

const whitelistedUserDoesntExists = {
  email: "__test__user_whitelisted_doesnt_exist@test.com",
  password: "a_valid_password",
  fullName: "Whitelisted user doesnt exist",
};

const whitelistedUserDoesntExistsSecond = {
  email: "__test__user_whitelisted_doesnt_exist_second@test.com",
  password: "a_valid_password",
  fullName: "Whitelisted user doesnt exist second",
};

const whitelistedUser = {
  email: "__test__user_already_exists@test.com",
  password: "a_valid_password",
  fullName: "User already exists",
};

const notWhitelistedUser = {
  email: "__test__user_not_whitelisted@test.com",
  password: "a_valid_password",
  fullName: "Not whitelisted",
};

beforeAll(async () => {
  await deleteUser(notWhitelistedUser.email);
  await insertUser(notWhitelistedUser);

  await deleteUser(whitelistedUser.email);
  await insertUser(whitelistedUser);
  await deleteWhitelistedEmail(whitelistedUser.email);
  await insertWhitelistedEmail(whitelistedUser.email);

  await deleteUser(whitelistedUserDoesntExists.email);
  await deleteWhitelistedEmail(whitelistedUserDoesntExists.email);
  await insertWhitelistedEmail(whitelistedUserDoesntExists.email);

  await deleteUser(whitelistedUserDoesntExistsSecond.email);
  await deleteWhitelistedEmail(whitelistedUserDoesntExistsSecond.email);
  await insertWhitelistedEmail(whitelistedUserDoesntExistsSecond.email);
});

afterAll(async () => {
  await deleteUser(notWhitelistedUser.email);

  await deleteUser(whitelistedUser.email);
  await deleteWhitelistedEmail(whitelistedUser.email);

  await deleteUser(whitelistedUserDoesntExists.email);
  await deleteWhitelistedEmail(whitelistedUserDoesntExists.email);

  await deleteUser(whitelistedUserDoesntExistsSecond.email);
  await deleteWhitelistedEmail(whitelistedUserDoesntExistsSecond.email);
});

describe("POST /api/v1/register handler", () => {
  test("Empty request body", async (done) => {
    const { req, res } = setup();

    await testExpressValidatorMiddleware(req as any, res as unknown as Response, registerValidators);
    await registerHandler(req as Request, res);

    const errors = validationResult(req).array();

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ errors });
    expect(res.send).not.toHaveBeenCalled();

    expect(errors?.length).toBe(3);
    const [emailError, passwordError, fullNameError] = errors;
    expect(emailError?.param).toBe("email");
    expect(emailError?.msg).toBe("Invalid value");
    expect(passwordError?.param).toBe("password");
    expect(passwordError?.msg).toBe("Password minimum length is 8.");
    expect(fullNameError?.param).toBe("fullName");
    expect(fullNameError?.msg).toBe("Invalid value");

    done();
  });

  test("User already exists", async (done) => {
    const { req, res } = setup({
      email: notWhitelistedUser.email,
      password: notWhitelistedUser.password,
      fullName: notWhitelistedUser.fullName,
    });

    await testExpressValidatorMiddleware(req as any, res as unknown as Response, registerValidators);
    await registerHandler(req as Request, res);

    const errors = validationResult(req).array();
    expect(errors?.length).toBe(0);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.send).toHaveBeenCalledWith(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    expect(res.json).not.toHaveBeenCalled();

    done();
  });

  test("Incorrect password", async (done) => {
    const { req, res } = setup({
      email: whitelistedUser.email,
      password: whitelistedUser.password,
      fullName: whitelistedUser.fullName,
    });

    await testExpressValidatorMiddleware(req as any, res as unknown as Response, registerValidators);
    await registerHandler(req as Request, res);

    const errors = validationResult(req).array();
    expect(errors?.length).toBe(0);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.send).toHaveBeenCalledWith(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    expect(res.json).not.toHaveBeenCalled();

    done();
  });

  test("Valid request", async (done) => {
    const { req, res } = setup({
      email: whitelistedUserDoesntExists.email,
      password: whitelistedUserDoesntExists.password,
      fullName: whitelistedUserDoesntExists.fullName,
    });

    await testExpressValidatorMiddleware(req as any, res as unknown as Response, registerValidators);
    await registerHandler(req as Request, res);

    const errors = validationResult(req).array();
    expect(errors?.length).toBe(0);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      user: {
        id: expect.any(String),
        email: whitelistedUserDoesntExists.email,
        fullName: whitelistedUserDoesntExists.fullName,
        role: expect.any(String),
      },
      accessToken: expect.any(String),
    });
    expect(res.send).not.toHaveBeenCalled();

    done();
  });
});

describe("POST /api/v1/register", () => {
  test("Empty request body", async (done) => {
    const res = await request
      .post("/api/v1/register")
      .set("Accept", "application/json")
      .expect(StatusCodes.UNAUTHORIZED)
      .expect("Content-Type", /application\/json/);

    expect(res.body.errors?.length).toBe(3);
    const emailError = res.body.errors.find((o) => o.param === "email");
    const passwordError = res.body.errors.find((o) => o.param === "password");
    const fullNameError = res.body.errors.find((o) => o.param === "fullName");
    expect(emailError?.param).toBe("email");
    expect(emailError?.msg).toBe("Invalid value");
    expect(passwordError?.param).toBe("password");
    expect(passwordError?.msg).toBe("Password minimum length is 8.");
    expect(fullNameError?.param).toBe("fullName");
    expect(fullNameError?.msg).toBe("Invalid value");

    done();
  });

  test("User not whitelisted", async (done) => {
    const res = await request
      .post("/api/v1/register")
      .set("Accept", "application/json")
      .send({
        email: notWhitelistedUser.email,
        password: notWhitelistedUser.password,
        fullName: notWhitelistedUser.fullName,
      })
      .expect(StatusCodes.UNAUTHORIZED);

    expect(res.text).toBe(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    expect(res.body.errors).toBeUndefined();

    done();
  });

  test("Valid request", async (done) => {
    const res = await request
      .post("/api/v1/register")
      .set("Accept", "application/json")
      .send({
        email: whitelistedUserDoesntExistsSecond.email,
        password: whitelistedUserDoesntExistsSecond.password,
        fullName: whitelistedUserDoesntExistsSecond.fullName,
      })
      .expect(StatusCodes.OK)
      .expect("Content-Type", /application\/json/);

    expect(res.body.errors).toBeUndefined();

    done();
  });
});
