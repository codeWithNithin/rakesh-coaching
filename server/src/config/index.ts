import dotenv from "dotenv";
dotenv.config({ path: `./.env.${process.env.NODE_ENV || "dev"}` });

const { PORT, NODE_ENV } = process.env;

export const config = {
  PORT,
  NODE_ENV,
};
