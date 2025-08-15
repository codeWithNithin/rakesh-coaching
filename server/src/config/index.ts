import dotenv from "dotenv";
dotenv.config({ path: `./.env.${process.env.NODE_ENV || "development"}` });

const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET, JWT_EXPIRY } = process.env;

export const config = {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRY,
};
