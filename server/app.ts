import express from "express";
import morgan from "morgan";
import { connectDB } from "./src/config/db.ts";
import envs from "./src/config/index.ts";

const app = express();
const PORT = Number(envs.port);

async function startServer() {
  // connect to the db via mongoose
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
    })
  } catch (e) {
    console.log("connection to mongoose failed ", e);
    process.exit(1);
  }
}

startServer();
