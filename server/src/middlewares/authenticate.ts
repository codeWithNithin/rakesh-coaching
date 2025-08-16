import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/index.js";
import User from "../models/user.model.js";
import createHttpError from "http-errors";

async function protect(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    createHttpError(401, "You are not logged in");
  }

  interface request extends Request {
    user?: {
      _id: string;
      userName: string;
      email: string;
    };
  }

  try {
    const decodedToken  = jwt.verify(token, config.JWT_SECRET as string) as { id: string };
    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
    createHttpError(400, "Invalid token");
    }
    // this line is throwing err
    req.user = user;
    next();
  } catch (error) {
   const err = createHttpError(400, "Invalid token");
  }
}

export default protect;
