import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import * as z from 'zod';

// Fix for ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root explicitly — this works no matter where you import from
config({ path: path.join(__dirname, "../../.env") });

// validate vars to make sure they exist
const envSchema = z.object({
  mongo_uri: z.string().url(),
  jwt_secret: z.string().min(32),
  port: z.coerce.number().default(5000),
  env_type: z.enum(["development", "production", "test"]),
});

const envs = envSchema.parse({
  mongo_uri: process.env.MONGO_URL,
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
  env_type: process.env.NODE_ENV
});

export default envs;
