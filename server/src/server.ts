import app from "./app.js";
import connectToDB from "./config/db.js";
import { config } from "./config/index.js";

const PORT = config.PORT;

const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log("Server started on port 3000");
  });
};

startServer();
