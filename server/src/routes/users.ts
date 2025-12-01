// src/routes/users.ts
import { Router } from "express";
import { Pool } from "pg";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import bcrypt from "bcrypt";

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

  // Update current user's profile
  router.put("/profile", async (req, res) => {
    const userId = req.user?.userId;
    const { fullname, email } = req.body;

    try {
      const result = await pool.query(
        "UPDATE users SET fullname = $1, email = $2 WHERE id = $3 RETURNING id, fullname, student_id, email, role",
        [fullname, email, userId],
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error updating profile." });
    }
  });

  // Change current user's password
  router.put("/profile/password", async (req, res) => {
    const userId = req.user?.userId;
    const { currentPassword, newPassword } = req.body;

    try {
      const userResult = await pool.query(
        "SELECT password_hash FROM users WHERE id = $1",
        [userId],
      );
      const user = userResult.rows[0];

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid current password." });
      }

      const salt = await bcrypt.genSalt(10);
      const newPasswordHash = await bcrypt.hash(newPassword, salt);

      await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
        newPasswordHash,
        userId,
      ]);

      res.json({ message: "Password updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error changing password." });
    }
  });

  // Get all users (admin only)
  router.get("/", adminMiddleware, async (req, res) => {
    try {
      const result = await pool.query("SELECT id, fullname, student_id, email, role, created_at FROM users");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching users." });
    }
  });

  // Get a single user by ID (admin only)
  router.get("/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT id, fullname, student_id, email, role FROM users WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching user." });
    }
  });

  // Update a user (admin only)
  router.put("/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const { fullname, student_id, email, role } = req.body;
    try {
      const result = await pool.query(
        "UPDATE users SET fullname = $1, student_id = $2, email = $3, role = $4 WHERE id = $5 RETURNING id, fullname, student_id, email, role",
        [fullname, student_id, email, role, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error updating user." });
    }
  });

  // Delete a user (admin only)
  router.delete("/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }
      res.json({ message: "User deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error deleting user." });
    }
  });

  return router;
};

