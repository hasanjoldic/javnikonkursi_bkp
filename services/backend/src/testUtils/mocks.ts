import { Request } from "express";

export function setup(body: Request["body"] = {}) {
  const req = {
    body,
  };
  const res = {
    status: jest.fn(function status() {
      return this;
    }),
    json: jest.fn(function status() {
      return this;
    }),
    send: jest.fn(function status() {
      return this;
    }),
  };
  return { req, res };
}
