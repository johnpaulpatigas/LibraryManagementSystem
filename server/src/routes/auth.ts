// src/routes/auth.ts
import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

export const createAuthRouter = (pool: Pool): Router => {
  const router = Router();

  router.post("/register", async (req, res) => {
    const { name, email, username, password, role = "user" } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUserQuery = `
                INSERT INTO users (name, email, username, password_hash, role)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, username, role;
            `;
      const result = await pool.query(newUserQuery, [
        name,
        email,
        username,
        passwordHash,
        role,
      ]);

      res.status(201).json({
        message: "User registered successfully!",
        user: result.rows[0],
      });
    } catch (error: any) {
      if (error.code === "23505") {
        return res
          .status(409)
          .json({ error: "Email or username already exists." });
      }
      console.error(error);
      res.status(500).json({ error: "Server error during registration." });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    try {
      const userQuery = "SELECT * FROM users WHERE email = $1";
      const result = await pool.query(userQuery, [email]);
      const user = result.rows[0];

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      const payload = {
        userId: user.id,
        username: user.username,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      res.json({
        message: "Logged in successfully!",
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error during login." });
    }
  });

  router.post("/logout", (req, res) => {
    res.json({ message: "Logout successful. Please clear your token." });
  });

  return router;
};
