import mongoose from "mongoose";
import type { NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

const userSchema = new mongoose.Schema({
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

  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: "HS256",
  });
};

const User = mongoose.model("User", userSchema);

export default User;
