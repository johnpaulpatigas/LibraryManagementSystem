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
          t.*,
          u.fullname AS user_name,
          b.title AS book_name,
          ib.status AS issued_book_status
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
      const result = await pool.query(
        `
        SELECT
          t.*,
          u.fullname AS user_fullname
        FROM
          transactions t
        JOIN
          users u ON t.user_id = u.id
        WHERE
          t.id = $1
      `,
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Transaction not found." });
      }
      // a non-admin user should only be able to see their own transactions
      if (
        req.user?.role !== "admin" &&
        result.rows[0].user_id !== req.user?.userId
      ) {
        return res
          .status(403)
          .json({ error: "Forbidden: You can only view your own transactions." });
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
        "INSERT INTO transactions (user_id, issued_book_id, type, amount, description, status) VALUES ($1, $2, $3, $4, $5, 'unpaid') RETURNING *",
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
    const { user_id, issued_book_id, type, amount, description, status } =
      req.body;
    try {
      let query = "UPDATE transactions SET ";
      const queryParams: any[] = [];
      const updates: string[] = [];
      let paramIndex = 1;

      if (user_id !== undefined) {
        updates.push(`user_id = $${paramIndex++}`);
        queryParams.push(user_id);
      }
      if (issued_book_id !== undefined) {
        updates.push(`issued_book_id = $${paramIndex++}`);
        queryParams.push(issued_book_id);
      }
      if (type !== undefined) {
        updates.push(`type = $${paramIndex++}`);
        queryParams.push(type);
      }
      if (amount !== undefined) {
        updates.push(`amount = $${paramIndex++}`);
        queryParams.push(amount);
      }
      if (description !== undefined) {
        updates.push(`description = $${paramIndex++}`);
        queryParams.push(description);
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
