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
    console.log("Ensuring schema exists...");
    await pool.query(usersSchema);
    await pool.query(schema);
    console.log("Schema ensured successfully.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during schema creation/update:", error);
    }
  }
};
