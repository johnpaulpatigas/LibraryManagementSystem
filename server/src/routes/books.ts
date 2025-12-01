// src/routes/books.ts
import { Router } from "express";
import { Pool } from "pg";
import { authMiddleware } from "../middleware/authMiddleware";

export const createBooksRouter = (pool: Pool) => {
  const router = Router();
  router.use(authMiddleware);

  // Helper function to fetch book with authors and categories
  const getBookWithDetails = async (bookId?: string) => {
    const query = `
      SELECT
        b.id,
        b.title,
        b.description,
        b.isbn,
        b.quantity,
        b.available_quantity,
        b.image_url,
        b.created_at,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', a.id, 'name', a.name)) FILTER (WHERE a.id IS NOT NULL),
          '[]'
        ) AS authors,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name)) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS categories
      FROM
        books b
      LEFT JOIN
        book_authors ba ON b.id = ba.book_id
      LEFT JOIN
        authors a ON ba.author_id = a.id
      LEFT JOIN
        book_categories bc ON b.id = bc.book_id
      LEFT JOIN
        categories c ON bc.category_id = c.id
      ${bookId ? "WHERE b.id = $1" : "WHERE b.available_quantity > 0"}
      GROUP BY
        b.id
      ORDER BY
        b.created_at DESC;
    `;
    return bookId ? pool.query(query, [bookId]) : pool.query(query);
  };

  const getAllBookWithDetails = async (bookId?: string) => {
    const query = `
      SELECT
        b.id,
        b.title,
        b.description,
        b.isbn,
        b.quantity,
        b.available_quantity,
        b.image_url,
        b.created_at,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', a.id, 'name', a.name)) FILTER (WHERE a.id IS NOT NULL),
          '[]'
        ) AS authors,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name)) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS categories
      FROM
        books b
      LEFT JOIN
        book_authors ba ON b.id = ba.book_id
      LEFT JOIN
        authors a ON ba.author_id = a.id
      LEFT JOIN
        book_categories bc ON b.id = bc.book_id
      LEFT JOIN
        categories c ON bc.category_id = c.id
      ${bookId ? "WHERE b.id = $1" : ""}
      GROUP BY
        b.id
      ORDER BY
        b.created_at DESC;
    `;
    return bookId ? pool.query(query, [bookId]) : pool.query(query);
  };

  // Get all books with authors and categories
  router.get("/", async (req, res) => {
    try {
      const result = await getBookWithDetails();
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching books." });
    }
  });

  router.get("/all", async (req, res) => {
    try {
      const result = await getAllBookWithDetails();
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching books." });
    }
  });


  // Get a single book by ID with authors and categories
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getBookWithDetails(id);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Book not found." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error fetching book." });
    }
  });

  // Create a new book
  router.post("/", async (req, res) => {
    const { title, description, isbn, quantity, available_quantity, image_url, author_id, category_id } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO books (title, description, isbn, quantity, available_quantity, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [title, description, isbn, quantity, available_quantity, image_url]
      );
      const book = result.rows[0];
      await pool.query(
        "INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)",
        [book.id, author_id]
      );
      await pool.query(
        "INSERT INTO book_categories (book_id, category_id) VALUES ($1, $2)",
        [book.id, category_id]
      );
      res.status(201).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error creating book." });
    }
  });

  // Update a book
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, isbn, quantity, available_quantity, image_url, author_id, category_id } = req.body;
    try {
      const result = await pool.query(
        "UPDATE books SET title = $1, description = $2, isbn = $3, quantity = $4, available_quantity = $5, image_url = $6 WHERE id = $7 RETURNING *",
        [title, description, isbn, quantity, available_quantity, image_url, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Book not found." });
      }
      await pool.query(
        "DELETE FROM book_authors WHERE book_id = $1",
        [id]
      );
      await pool.query(
        "INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)",
        [id, author_id]
      );
      await pool.query(
        "DELETE FROM book_categories WHERE book_id = $1",
        [id]
      );
      await pool.query(
        "INSERT INTO book_categories (book_id, category_id) VALUES ($1, $2)",
        [id, category_id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error updating book." });
    }
  });

  // Delete a book
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Book not found." });
      }
      res.json({ message: "Book deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error deleting book." });
    }
  });

  // Associate an author with a book
  router.post("/:id/authors", async (req, res) => {
    const { id } = req.params;
    const { authorId } = req.body;
    try {
      await pool.query(
        "INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)",
        [id, authorId]
      );
      res.status(201).json({ message: "Author associated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error associating author." });
    }
  });

  // Remove an author from a book
  router.delete("/:id/authors/:authorId", async (req, res) => {
    const { id, authorId } = req.params;
    try {
      await pool.query(
        "DELETE FROM book_authors WHERE book_id = $1 AND author_id = $2",
        [id, authorId]
      );
      res.json({ message: "Author association removed successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error removing author association." });
    }
  });

  // Associate a category with a book
  router.post("/:id/categories", async (req, res) => {
    const { id } = req.params;
    const { categoryId } = req.body;
    try {
      await pool.query(
        "INSERT INTO book_categories (book_id, category_id) VALUES ($1, $2)",
        [id, categoryId]
      );
      res.status(201).json({ message: "Category associated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error associating category." });
    }
  });

  // Remove a category from a book
  router.delete("/:id/categories/:categoryId", async (req, res) => {
    const { id, categoryId } = req.params;
    try {
      await pool.query(
        "DELETE FROM book_categories WHERE book_id = $1 AND category_id = $2",
        [id, categoryId]
      );
      res.json({ message: "Category association removed successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error removing category association." });
    }
  });

  return router;
};
