// src/routes/issued_books.ts
import { Router } from "express";
import { Pool } from "pg";
import { authMiddleware } from "../middleware/authMiddleware";

export const createIssuedBooksRouter = (pool: Pool) => {
  const router = Router();
  router.use(authMiddleware);

  // Helper function to fetch issued book with book, author, and category details
  const getIssuedBookWithDetails = async (issuedBookId?: string, userId?: string) => {
    const query = `
      SELECT
        ib.id AS issued_book_id,
        ib.issue_date,
        ib.due_date,
        ib.return_date,
        ib.status AS issued_status,
        b.id AS book_id,
        b.title,
        b.description,
        b.isbn,
        b.quantity,
        b.available_quantity,
        u.id AS user_id,
        u.fullname AS user_fullname,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', a.id, 'name', a.name)),
          '[]'
        ) AS authors,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name)),
          '[]'
        ) AS categories
      FROM
        issued_books ib
      JOIN
        books b ON ib.book_id = b.id
      JOIN
        users u ON ib.user_id = u.id
      LEFT JOIN
        book_authors ba ON b.id = ba.book_id
      LEFT JOIN
        authors a ON ba.author_id = a.id
      LEFT JOIN
        book_categories bc ON b.id = bc.book_id
      LEFT JOIN
        categories c ON bc.category_id = c.id
      WHERE
        TRUE
        ${issuedBookId ? "AND ib.id = $1" : ""}
        ${userId ? `AND ib.user_id = ${issuedBookId ? "$2" : "$1"}` : ""}
      GROUP BY
        ib.id, b.id, u.id
      ORDER BY
        ib.issue_date DESC;
    `;
    const params = [];
    if (issuedBookId) params.push(issuedBookId);
    if (userId) params.push(userId);
    return pool.query(query, params);
  };

  // Get all issued books (admin only) or user's issued books
  router.get("/", async (req, res) => {
    try {
      if (req.user?.role === "admin") {
        const result = await getIssuedBookWithDetails();
        res.json(result.rows);
      } else {
        const result = await getIssuedBookWithDetails(undefined, String(req.user?.userId));
        res.json(result.rows);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching issued books." });
    }
  });

  // Get a single issued book by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getIssuedBookWithDetails(id);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Issued book not found." });
      }
      // Ensure non-admin users can only view their own issued books
      if (req.user?.role !== "admin" && result.rows[0].user_id !== req.user?.userId) {
        return res.status(403).json({ error: "Forbidden: You can only view your own issued books." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching issued book." });
    }
  });

  // Issue a book
  router.post("/", async (req, res) => {
    const { book_id, user_id, due_date } = req.body;
    try {
      // Check if the book is available
      const bookResult = await pool.query("SELECT * FROM books WHERE id = $1", [book_id]);
      const book = bookResult.rows[0];
      if (!book) {
        return res.status(404).json({ error: "Book not found." });
      }
      if (book.available_quantity <= 0) {
        return res.status(400).json({ error: "Book is not available." });
      }

      // Decrement the available quantity
      await pool.query("UPDATE books SET available_quantity = available_quantity - 1 WHERE id = $1", [book_id]);

      // Create the issued book record
      const result = await pool.query(
        "INSERT INTO issued_books (book_id, user_id, due_date) VALUES ($1, $2, $3) RETURNING *",
        [book_id, user_id, due_date]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error issuing book." });
    }
  });

  // Update an issued book (e.g., return a book)
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { return_date, status } = req.body;
    try {
      const result = await pool.query(
        "UPDATE issued_books SET return_date = $1, status = $2 WHERE id = $3 RETURNING *",
        [return_date, status, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Issued book not found." });
      }

      // If the book is returned, increment the available quantity
      if (status === 'returned') {
        const issuedBook = result.rows[0];
        await pool.query("UPDATE books SET available_quantity = available_quantity + 1 WHERE id = $1", [issuedBook.book_id]);
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error updating issued book." });
    }
  });

  return router;
};
