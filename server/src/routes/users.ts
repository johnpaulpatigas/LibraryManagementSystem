// src/routes/users.ts
import { Router } from "express";
import { Pool } from "pg";
import { authMiddleware } from "../middleware/authMiddleware";

export const createUsersRouter = (pool: Pool) => {
  const router = Router();

  router.use(authMiddleware);

  router.get("/profile", async (req, res) => {
    const userId = req.user?.userId;

    try {
      const result = await pool.query(
        "SELECT id, fullname, student_id, email, role FROM users WHERE id = $1",
        [userId],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching profile." });
    }
  });

  return router;
};
