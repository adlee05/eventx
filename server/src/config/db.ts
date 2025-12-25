import envs from "./index.ts";
import mongoose from "mongoose";

async function connectDB() {
  // setting up the client
  if (!envs.mongo_uri) {
    throw new Error("MongoDB Connection url missing");
  }

  await mongoose.connect(envs.mongo_uri); // errors are handled by caller
  console.log("eonnected to the db successfully..");
}

export { connectDB };
