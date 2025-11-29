// src/index.ts
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Pool } from "pg";
import { createAuthRouter } from "./routes/auth";
import { createUsersRouter } from "./routes/users";
import { createBooksRouter } from "./routes/books";
import { createAuthorsRouter } from "./routes/authors";
import { createCategoriesRouter } from "./routes/categories";
import { createIssuedBooksRouter } from "./routes/issued_books";
import { createBookRequestsRouter } from "./routes/book_requests";
import { createSchema } from "./schema/schema";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

createSchema(pool);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const authRouter = createAuthRouter(pool);
const usersRouter = createUsersRouter(pool);
const booksRouter = createBooksRouter(pool);
const authorsRouter = createAuthorsRouter(pool);
const categoriesRouter = createCategoriesRouter(pool);
const issuedBooksRouter = createIssuedBooksRouter(pool);
const bookRequestsRouter = createBookRequestsRouter(pool);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/issued-books", issuedBooksRouter);
app.use("/api/book-requests", bookRequestsRouter);

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
