import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root explicitly — this works no matter where you import from
config({ path: path.join(__dirname, "../../.env") });

const envs = {
  mongo_user: process.env.MONGO_USER,
  mongo_pass: process.env.MONGO_PASS,
  mongo_uri: process.env.MONGO_URL,
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT,
}

export default envs;
