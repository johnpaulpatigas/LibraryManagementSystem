// src/index.ts
import dotenv from "dotenv";
import express from "express";
import { Pool } from "pg";
import { createAuthRouter } from "./routes/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());

const authRouter = createAuthRouter(pool);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Library API is running!");
});

app.get("/test-db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    res.json({
      message: "Database connection successful!",
      time: result.rows[0],
    });
    client.release();
  } catch (error) {
    console.error("Database connection error", error);
    res.status(500).json({ error: "Failed to connect to the database." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
