import type { NextFunction, Request, Response } from "express";
import type { RequestHandler } from "express-serve-static-core";

const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;
