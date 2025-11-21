// src/routes/auth.ts
import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const createAuthRouter = (pool: Pool): Router => {
  const router = Router();

  router.post("/register", async (req, res) => {
    const { fullname, studentid, email, password, role = "user" } = req.body;

    if (!fullname || !studentid || !email || !password) {
      return res.status(400).json({
        error: "Full name, student ID, email, and password are required.",
      });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUserQuery = `
                    INSERT INTO users (fullname, student_id, email, password_hash, role)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id, student_id, role;
                `;

      const result = await pool.query(newUserQuery, [
        fullname,
        studentid,
        email,
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
          .json({ error: "Student ID or email already exists." });
      }
      console.error(error);
      res.status(500).json({ error: "Server error during registration." });
    }
  });

  router.post("/login", async (req, res) => {
    const { studentid, password, rememberMe } = req.body;

    if (!studentid || !password) {
      return res
        .status(400)
        .json({ error: "Student ID and password are required." });
    }

    try {
      const userQuery = "SELECT * FROM users WHERE student_id = $1";
      const result = await pool.query(userQuery, [studentid]);
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
        studentId: user.student_id,
        fullname: user.fullname,
        role: user.role,
      };

      const expiresIn = rememberMe ? "7d" : "1h";

      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn,
      });

      res.json({
        message: "Logged in successfully!",
        token,
        user: {
          id: user.id,
          studentId: user.student_id,
          fullname: user.fullname,
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

  router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
      const userResult = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
      );
      const user = userResult.rows[0];

      if (!user) {
        return res.json({
          message:
            "If an account with that email exists, a password reset link has been sent.",
        });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");

      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

      await pool.query(
        "UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3",
        [hashedToken, tokenExpiry, user.id],
      );

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      const message = `
                  <h1>Password Reset Request</h1>
                  <p>You are receiving this email because you (or someone else) have requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process:</p>
                  <a href="${resetUrl}" target="_blank">${resetUrl}</a>
                  <p>This link will expire in 10 minutes.</p>
                  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
              `;

      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: '"Library App" <noreply@libraryapp.com>',
        to: user.email,
        subject: "Password Reset Token",
        html: message,
      });

      res.json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      res.json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }
  });

  router.post("/reset-password", async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
      return res
        .status(400)
        .json({ error: "Token and new password are required." });
    }

    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const userResult = await pool.query(
        "SELECT * FROM users WHERE password_reset_token = $1 AND password_reset_expires > NOW()",
        [hashedToken],
      );

      const user = userResult.rows[0];

      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid or expired password reset token." });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      await pool.query(
        "UPDATE users SET password_hash = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2",
        [passwordHash, user.id],
      );

      res.json({ message: "Password has been reset successfully." });
    } catch (error) {
      console.error("Reset Password Error:", error);
      res.status(500).json({ error: "Server error during password reset." });
    }
  });

  return router;
};
