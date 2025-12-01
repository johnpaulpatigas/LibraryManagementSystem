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
      let query = `
        SELECT
          br.*,
          u.fullname AS user_fullname
        FROM
          book_requests br
        JOIN
          users u ON br.user_id = u.id
      `;
      const queryParams: any[] = [];
      if (req.user?.role !== "admin") {
        query += " WHERE br.user_id = $1";
        queryParams.push(req.user?.userId);
      }
      query += " ORDER BY br.created_at DESC";
      const result = await pool.query(query, queryParams);
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
      let query = `
        SELECT
          br.*,
          u.fullname AS user_fullname
        FROM
          book_requests br
        JOIN
          users u ON br.user_id = u.id
        WHERE
          br.id = $1
      `;
      const queryParams: any[] = [id];
      if (req.user?.role !== "admin") {
        query += " AND br.user_id = $2";
        queryParams.push(req.user?.userId);
      }
      const result = await pool.query(query, queryParams);
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
    const { book_title, author_name, status } = req.body;
    const userId = req.user?.userId;
    try {
      const result = await pool.query(
        "INSERT INTO book_requests (user_id, book_title, author_name, status) VALUES ($1, $2, $3, $4) RETURNING *",
        [userId, book_title, author_name, status || "pending"]
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
    const { book_title, author_name, status } = req.body;
    try {
      let query = "UPDATE book_requests SET ";
      const queryParams: any[] = [];
      const updates: string[] = [];
      let paramIndex = 1;

      if (book_title !== undefined) {
        updates.push(`book_title = $${paramIndex++}`);
        queryParams.push(book_title);
      }
      if (author_name !== undefined) {
        updates.push(`author_name = $${paramIndex++}`);
        queryParams.push(author_name);
      }
      if (status !== undefined) {
        updates.push(`status = $${paramIndex++}`);
        queryParams.push(status);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: "No fields to update." });
      }

      query += updates.join(", ") + ` WHERE id = $${paramIndex++} RETURNING *`;
      queryParams.push(id);

      const result = await pool.query(query, queryParams);
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
