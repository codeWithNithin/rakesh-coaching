import mongoose from "mongoose";
import { config } from "./index.js";
import { logger } from "./logger.js";

export default async function connectToDB() {
  try {
    mongoose.connection.on("connected", () => {
      logger.info("Connected to database successfully");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("Error in connecting to database.", err);
    });

    console.log('config', config);

    await mongoose.connect(config.MONGO_URI as any);
  } catch (error) {
    logger.error("Error in connecting to database.", error);
    process.exit(1);
  }
}
