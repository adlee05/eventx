import express from "express";
import morgan from "morgan";
import { connectDB } from "./src/config/db.ts";
import envs from "./src/config/index.ts";
import auth from "./src/routes/auth.ts";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
const PORT = Number(envs.port);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

async function startServer() {
  // connect to the db via mongoose
  try {
    await connectDB();
    console.log("connected to mongodb database:", mongoose.connection.name);
    app.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
    })
  } catch (e) {
    console.log("connection to mongoose failed ", e);
    process.exit(1);
  }
}

startServer();

// middleware

app.use('/auth', auth);
