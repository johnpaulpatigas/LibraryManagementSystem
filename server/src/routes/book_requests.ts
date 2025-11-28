// src/routes/book_requests.ts
import { Router } from "express";
import { Pool } from "pg";
import { authMiddleware } from "../middleware/authMiddleware";

export const createBookRequestsRouter = (pool: Pool) => {
  const router = Router();
  router.use(authMiddleware);

  // Get all book requests
  router.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM book_requests");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching book requests." });
    }
  });

  // Get a single book request by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM book_requests WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Book request not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching book request." });
    }
  });

  // Create a new book request
  router.post("/", async (req, res) => {
    const { book_title, author_name } = req.body;
    const userId = req.user?.userId;
    try {
      const result = await pool.query(
        "INSERT INTO book_requests (user_id, book_title, author_name) VALUES ($1, $2, $3) RETURNING *",
        [userId, book_title, author_name]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error creating book request." });
    }
  });

  // Update a book request
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const result = await pool.query(
        "UPDATE book_requests SET status = $1 WHERE id = $2 RETURNING *",
        [status, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Book request not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error updating book request." });
    }
  });

  // Delete a book request
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("DELETE FROM book_requests WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Book request not found." });
      }
      res.json({ message: "Book request deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error deleting book request." });
    }
  });

  return router;
};
