// src/routes/categories.ts
import { Router } from "express";
import { Pool } from "pg";
import { authMiddleware } from "../middleware/authMiddleware";

export const createCategoriesRouter = (pool: Pool) => {
  const router = Router();
  router.use(authMiddleware);

  // Get all categories
  router.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM categories");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching categories." });
    }
  });

  // Get a single category by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Category not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching category." });
    }
  });

  // Create a new category
  router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO categories (name) VALUES ($1) RETURNING *",
        [name]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error creating category." });
    }
  });

  // Update a category
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const result = await pool.query(
        "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Category not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error updating category." });
    }
  });

  // Delete a category
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Category not found." });
      }
      res.json({ message: "Category deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error deleting category." });
    }
  });

  return router;
};
