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
      const result = await pool.query("SELECT * FROM invoices");
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
      const result = await pool.query("SELECT * FROM invoices WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Invoice not found." });
      }
      // a non-admin user should only be able to see their own invoices
      if (req.user?.role !== "admin" && result.rows[0].user_id !== req.user?.userId) {
        return res.status(403).json({ error: "Forbidden: You can only view your own invoices." });
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
        [user_id, amount, due_date, status]
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
      const result = await pool.query(
        "UPDATE invoices SET user_id = $1, amount = $2, due_date = $3, status = $4 WHERE id = $5 RETURNING *",
        [user_id, amount, due_date, status, id]
      );
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
