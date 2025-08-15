import type { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";

export default class AuthServices {
  constructor() {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    // 1. validate the Request body
    const { email, userName, password } = req.body;

    if (!email || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. check if that user already exists by cheking the email id
    const user = await User.findOne({ email: email });

    // 3. if found then send err msg saying user already exists 400.
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 4. hash the password

    // 5. then create the user
    await User.create(req.body);

    //6. generate the token and save it in cookie

    //7.. send success msg
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    // 1. validate incoming request
    // 2. check if user exists
    // 3. check if password is correct
    // 4. generate the token and save it in cookie
    // 5. send success msg
  };

  logout = (req: Request, res: Response, next: NextFunction) => {};
}
