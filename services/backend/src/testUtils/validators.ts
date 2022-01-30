import { Request, Response } from "express";

export const testExpressValidatorMiddleware = async (req: Request, res: Response, middlewares) => {
  await Promise.all(
    middlewares.map(async (middleware) => {
      await middleware(req, res, () => undefined);
    })
  );
};
