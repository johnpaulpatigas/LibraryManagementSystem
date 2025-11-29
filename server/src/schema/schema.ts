// src/schema/schema.ts
import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";

export const createSchema = async (pool: Pool) => {
  const schema = fs.readFileSync(
    path.join(__dirname, "library.sql"),
    "utf8"
  );
  const usersSchema = fs.readFileSync(path.join(__dirname, "users.sql"), "utf8");
  try {
    await pool.query(usersSchema);
    await pool.query(schema);
    console.log("Schema created successfully.");
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("already exists")) {
        console.log("Schema already exists.");
      } else {
        console.error("Error creating schema:", error);
      }
    }
  }
};
