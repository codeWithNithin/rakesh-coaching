import type { NextFunction, Response, Request } from "express";
import type AuthServices from "../services/auth.services.js";

export default class AuthControllers {

    constructor(private authServices: AuthServices) {}
  register = (req: Request, res: Response, next: NextFunction) => {
    res.send("register");
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    res.send("register");
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    res.send("register");
  };
}
