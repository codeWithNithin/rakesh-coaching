import mongoose, { Model } from "mongoose";
import type { NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/index.js";

// 1️⃣ Interface for the fields in the collection
interface IUser {
  email: string;
  userName: string;
  password: string;
}

// 2️⃣ Interface for instance methods
interface IUserMethods {
  generateToken(): string;
  comparePassword(password: string): Promise<boolean>;
}


const userSchema = new mongoose.Schema<IUser, Model<IUser, {}, IUserMethods>>({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// before document gets saved hash the password and store it in the database.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  if (!config.JWT_SECRET) {
    return;
  }

  const payload: JwtPayload = {
    id: this._id,
  }

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: "HS256",
  });
};

const User = mongoose.model<IUser, Model<IUser, {}, IUserMethods>>("User", userSchema);

export default User;
