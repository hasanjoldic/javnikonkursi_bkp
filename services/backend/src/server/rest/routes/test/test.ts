import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get(
  "/api/v1/test",

  async (req: express.Request<{}, any, {}>, res) => {
    res.status(StatusCodes.OK).send("test");
  }
);

export default router;
