// app/(admin)/manage-books/page.tsx
"use client";
import AdminLayout from "@/components/AdminLayout";
import BookModal from "@/components/BookModal";
import { deleteBook, getBooks } from "@/lib/services/books";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ManageBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        fetchBooks();
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchBooks();
  };

  return (
    <AdminLayout activePage="Manage Books">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Manage Books</h1>
        <button
          onClick={handleAddBook}
          className="flex items-center gap-2 rounded-md bg-[#587878] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#4a6666]"
        >
          <Plus className="h-5 w-5" />
          <span>Add Books</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="w-full text-left">
          <thead className="bg-[#587878] text-white">
            <tr>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">ISBN</th>
              <th className="p-4 font-semibold">Quantity</th>
              <th className="p-4 font-semibold">Available</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-gray-800">{book.title}</td>
                <td className="p-4 text-gray-600">{book.isbn}</td>
                <td className="p-4 text-gray-800">{book.quantity}</td>
                <td className="p-4 text-gray-800">{book.available_quantity}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BookModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        book={selectedBook}
        onFinished={handleModalClose}
      />
    </AdminLayout>
  );
}
