import envs from "./index.js";
import mongoose from "mongoose";

async function connectDB() {
  // setting up the client
  if (!envs.mongo_local) {
    throw new Error("MongoDB Connection url missing");
  }

  await mongoose.connect(envs.mongo_local); // Errors are handled by the caller
  console.log("eonnected to the db successfully..");
}

export { connectDB };
