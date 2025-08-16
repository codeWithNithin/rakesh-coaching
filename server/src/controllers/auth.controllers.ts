import type { NextFunction, Response, Request } from "express";
import User from "../models/user.model.js";
import type UserService from "../services/user.services.js";

export default class AuthControllers {
  constructor(private userService: UserService) {}
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

    // 5. then create the user
    const newUser = await User.create(req.body);

    console.log("newUser", newUser);

    //6. generate the token and save it in cookie
    const token = newUser.generateToken();

    res.cookie("token", token, {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    //7.. send success msg
    res.status(201).json({ id: newUser._id });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // 1. validate incoming request

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // 3. check if password is correct
    const isPasswordCorrect = user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. generate the token and save it in cookie

    const token = user.generateToken();

    res.cookie("token", token, {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // 5. send success msg
    res.status(200).json({ id: user._id })
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
    };
}
