import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Pool connection setup
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

// Test connection
db.connect()
  .then((client) => {
    if (client) console.log("✅ Database холболт амжилттай!");

    client.release();
  })
  .catch((err) => {
    console.error("❌ Database холболт амжилтгүй:", err.message);
    process.exit(1);
  });

export default db;
