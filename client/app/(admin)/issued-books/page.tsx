"use client";
import AdminLayout from "@/components/AdminLayout";
import { getIssuedBooks, updateIssuedBook } from "@/lib/services/issued_books";
import { format } from "date-fns";
import { History } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type IssuedBook = {
  issued_book_id: number;
  issue_date: string;
  due_date: string;
  return_date: string | null;
  issued_status: "issued" | "returned" | "overdue";
  book_id: number;
  title: string;
  isbn: string;
  user_id: number;
  user_fullname: string;
  bookName: string;
  borrower: string;
  fees: number;
  toReturn: string;
  imageUrl: string;
};

type DisplayStatus = "On-going" | "Returned" | "Overdue";

const getDisplayStatus = (
  status: IssuedBook["issued_status"],
): DisplayStatus => {
  if (status === "issued") return "On-going";
  if (status === "returned") return "Returned";
  if (status === "overdue") return "Overdue";
  return "On-going";
};

const StatusBadge = ({ status }: { status: DisplayStatus }) => {
  const statusStyles = {
    "On-going": "bg-green-500 text-white",
    Returned: "bg-blue-500 text-white",
    Overdue: "bg-red-500 text-white",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default function IssuedBooksAdminPage() {
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIssuedBooks = async () => {
    try {
      setLoading(true);
      const response = await getIssuedBooks();
      const formattedBooks: IssuedBook[] = response.data.map((book: any) => ({
        issued_book_id: book.issued_book_id,
        issue_date: book.issue_date,
        due_date: book.due_date,
        return_date: book.return_date,
        issued_status: book.issued_status,
        book_id: book.book_id,
        title: book.title,
        isbn: book.isbn,
        user_id: book.user_id,
        user_fullname: book.user_fullname,
        bookName: book.title,
        borrower: book.user_fullname,
        fees: 0,
        toReturn: format(new Date(book.due_date), "dd/MM/yyyy"),
        imageUrl: "/file.svg",
      }));
      setIssuedBooks(formattedBooks);
    } catch (err: any) {
      setError(err.message || "Failed to fetch issued books.");
      console.error("Failed to fetch issued books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const handleReturnBook = async (id: number) => {
    if (
      window.confirm("Are you sure you want to mark this book as returned?")
    ) {
      try {
        await updateIssuedBook(id, {
          return_date: new Date().toISOString(),
          status: "returned",
        });
        fetchIssuedBooks(); // Refresh the list
      } catch (err: any) {
        alert("Failed to return book: " + (err.message || "Unknown error"));
        console.error("Failed to return book:", err);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout activePage="Issued Books">
        <div className="text-center text-gray-600">Loading issued books...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activePage="Issued Books">
        <div className="text-center text-red-600">Error: {error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="Issued Books">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Issued Books</h1>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Show</span>
          <select className="rounded-md border border-gray-300 bg-white px-2 py-1 focus:ring-2 focus:ring-[#587878] focus:outline-none">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
          <span>entries</span>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-64 rounded-md border border-gray-300 bg-white px-3 py-1.5 focus:ring-2 focus:ring-[#587878] focus:outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="w-full text-left">
          <thead className="bg-[#7A9999] text-white">
            <tr>
              <th className="p-4 font-semibold">No.</th>
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Issued #</th>
              <th className="p-4 font-semibold">Borrower</th>
              <th className="p-4 font-semibold">Book Name</th>
              <th className="p-4 font-semibold">Due Date</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr
                key={book.issued_book_id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4 text-gray-800">{book.issued_book_id}</td>
                <td className="p-4">
                  <Image
                    src={book.imageUrl}
                    alt={book.bookName}
                    width={40}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </td>
                <td className="p-4 text-gray-800">{book.issued_book_id}</td>
                <td className="p-4 text-gray-600">{book.borrower}</td>
                <td className="p-4 font-medium text-gray-800">
                  {book.bookName}
                </td>
                <td className="p-4 text-gray-600">{book.toReturn}</td>
                <td className="p-4">
                  <StatusBadge status={getDisplayStatus(book.issued_status)} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {book.issued_status !== "returned" && (
                      <button
                        onClick={() => handleReturnBook(book.issued_book_id)}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800"
                        title="Mark as Returned"
                      >
                        <History className="h-5 w-5" />
                        <span className="text-sm">Return</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end text-sm text-gray-700">
        <button className="rounded-md px-3 py-1 hover:bg-gray-200">
          Previous
        </button>
        <span className="mx-2 rounded-md bg-[#587878] px-3 py-1 text-white">
          1
        </span>
        <button className="rounded-md px-3 py-1 hover:bg-gray-200">Next</button>
      </div>
    </AdminLayout>
  );
}
