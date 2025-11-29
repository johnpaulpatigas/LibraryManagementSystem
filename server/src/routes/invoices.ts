// src/routes/invoices.ts
import { Router } from "express";
import { Pool } from "pg";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

export const createInvoicesRouter = (pool: Pool) => {
  const router = Router();
  router.use(authMiddleware);

  // Get all invoices (admin only)
  router.get("/", adminMiddleware, async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          i.*,
          u.fullname AS user_fullname
        FROM
          invoices i
        JOIN
          users u ON i.user_id = u.id
        ORDER BY
          i.created_at DESC
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching invoices." });
    }
  });

  // Get a single invoice by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        `
        SELECT
          i.*,
          u.fullname AS user_fullname
        FROM
          invoices i
        JOIN
          users u ON i.user_id = u.id
        WHERE
          i.id = $1
      `,
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Invoice not found." });
      }
      // a non-admin user should only be able to see their own invoices
      if (
        req.user?.role !== "admin" &&
        result.rows[0].user_id !== req.user?.userId
      ) {
        return res
          .status(403)
          .json({ error: "Forbidden: You can only view your own invoices." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching invoice." });
    }
  });

  // Create a new invoice (admin only)
  router.post("/", adminMiddleware, async (req, res) => {
    const { user_id, amount, due_date, status } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO invoices (user_id, amount, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, amount, due_date, status || "pending"]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error creating invoice." });
    }
  });

  // Update an invoice (admin only)
  router.put("/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const { user_id, amount, due_date, status } = req.body;
    try {
      let query = "UPDATE invoices SET ";
      const queryParams: any[] = [];
      const updates: string[] = [];
      let paramIndex = 1;

      if (user_id !== undefined) {
        updates.push(`user_id = $${paramIndex++}`);
        queryParams.push(user_id);
      }
      if (amount !== undefined) {
        updates.push(`amount = $${paramIndex++}`);
        queryParams.push(amount);
      }
      if (due_date !== undefined) {
        updates.push(`due_date = $${paramIndex++}`);
        queryParams.push(due_date);
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
        return res.status(404).json({ error: "Invoice not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error updating invoice." });
    }
  });

  // Delete an invoice (admin only)
  router.delete("/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("DELETE FROM invoices WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Invoice not found." });
      }
      res.json({ message: "Invoice deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error deleting invoice." });
    }
  });

  return router;
};
