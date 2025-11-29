// src/routes/transactions.ts
import { Router } from "express";
import { Pool } from "pg";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

export const createTransactionsRouter = (pool: Pool) => {
  const router = Router();
  router.use(authMiddleware);

  // Get all transactions (admin only)
  router.get("/", adminMiddleware, async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          t.id,
          t.user_id,
          u.fullname AS user_name,
          t.issued_book_id,
          b.title AS book_name,
          t.type,
          t.amount,
          t.description,
          t.status, -- Assuming 'status' column exists in transactions table
          t.created_at
        FROM
          transactions t
        JOIN
          users u ON t.user_id = u.id
        LEFT JOIN
          issued_books ib ON t.issued_book_id = ib.id
        LEFT JOIN
          books b ON ib.book_id = b.id
        ORDER BY
          t.created_at DESC
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching transactions." });
    }
  });

  // Get a single transaction by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM transactions WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Transaction not found." });
      }
      // a non-admin user should only be able to see their own transactions
      if (req.user?.role !== "admin" && result.rows[0].user_id !== req.user?.userId) {
        return res.status(403).json({ error: "Forbidden: You can only view your own transactions." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching transaction." });
    }
  });

  // Create a new transaction (admin only)
  router.post("/", adminMiddleware, async (req, res) => {
    const { user_id, issued_book_id, type, amount, description } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO transactions (user_id, issued_book_id, type, amount, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user_id, issued_book_id, type, amount, description]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error creating transaction." });
    }
  });

  // Update a transaction (admin only)
  router.put("/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const { user_id, issued_book_id, type, amount, description, status } = req.body;
    try {
      const result = await pool.query(
        "UPDATE transactions SET user_id = $1, issued_book_id = $2, type = $3, amount = $4, description = $5, status = $6 WHERE id = $7 RETURNING *",
        [user_id, issued_book_id, type, amount, description, status, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Transaction not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error updating transaction." });
    }
  });

  // Delete a transaction (admin only)
  router.delete("/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("DELETE FROM transactions WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Transaction not found." });
      }
      res.json({ message: "Transaction deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error deleting transaction." });
    }
  });

  return router;
};
