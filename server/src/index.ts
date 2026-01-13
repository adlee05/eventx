import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import envs from "./config/index.js";
import auth from "./routes/auth.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import eventRoutes from "./routes/events.js"

const app = express();
const PORT = Number(envs.port);

// middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// middleware
app.use('/auth', auth);

//routes
app.use('/event',eventRoutes);

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

