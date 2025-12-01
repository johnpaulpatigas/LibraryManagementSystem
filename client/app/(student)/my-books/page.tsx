// app/(student)/my-books/page.tsx
"use client";
import StudentLayout from "@/components/StudentLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getIssuedBooks, updateIssuedBook } from "@/lib/services/issued_books";

const BookCard = ({ issuedBook, onReturn }: { issuedBook: any, onReturn: (id: number) => void }) => {
  const statusColors: { [key: string]: string } = {
    returned: "text-green-600",
    issued: "text-orange-500",
    overdue: "text-red-600",
  };

  const primaryCategory =
    issuedBook.categories && issuedBook.categories.length > 0
      ? issuedBook.categories[0].name
      : "N/A";
  const primaryAuthor =
    issuedBook.authors && issuedBook.authors.length > 0
      ? issuedBook.authors[0].name
      : "N/A";

  const displayStatus = issuedBook.is_overdue ? "overdue" : issuedBook.status;

  return (
    <div className="overflow-hidden rounded-lg bg-[#EAE8E3] shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={issuedBook.image_url || `https://picsum.photos/seed/${issuedBook.book_id}/200/300`}
          alt={`Cover of ${issuedBook.title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-600">{primaryCategory}</p>
        <h3 className="mt-1 text-lg font-bold text-gray-800">
          {issuedBook.title}
        </h3>
        <p className="text-sm text-gray-600">{primaryAuthor}</p>
        <p className="mt-2 h-10 overflow-hidden text-sm text-gray-700">
          {issuedBook.description}
        </p>
        <p className="mt-3 text-sm text-gray-800">
          Status:{" "}
          <span className={`font-bold ${statusColors[displayStatus]}`}>
            {displayStatus}
          </span>
        </p>
        <p className="text-sm text-gray-800">
          Due Date: {new Date(issuedBook.due_date).toLocaleDateString()}
        </p>
        {issuedBook.return_date && (
          <p className="text-sm text-gray-800">
            Return Date: {new Date(issuedBook.return_date).toLocaleDateString()}
          </p>
        )}
        {displayStatus === "issued" && (
          <button
            onClick={() => onReturn(issuedBook.issued_book_id)}
            className="mt-4 w-full rounded-md bg-[#587878] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#4a6666]"
          >
            Return
          </button>
        )}
      </div>
    </div>
  );
};

export default function IssuedBooksPage() {
  const [issuedBooks, setIssuedBooks] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const fetchIssuedBooks = async () => {
    try {
      const response = await getIssuedBooks();
      setIssuedBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch issued books:", error);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const handleReturn = async (id: number) => {
    if (window.confirm("Are you sure you want to return this book?")) {
      try {
        await updateIssuedBook(id, { status: "returned", return_date: new Date().toISOString() });
        fetchIssuedBooks();
      } catch (error) {
        console.error("Failed to return book:", error);
      }
    }
  };

  const statuses = [
    "All",
    ...new Set(
      issuedBooks.map((book) => (book.is_overdue ? "overdue" : book.status)),
    ),
  ];

  const filteredBooks = issuedBooks.filter((issuedBook) => {
    const bookStatus = issuedBook.is_overdue ? "overdue" : issuedBook.status;
    return selectedStatus === "All" || bookStatus === selectedStatus;
  });

  return (
    <StudentLayout activePage="Issued Books" headerTitle="Issued Books">
      <div className="mb-8 flex items-center justify-start">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-1/4 rounded-lg border border-gray-400 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#587878] focus:outline-none"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((issuedBook) => (
            <BookCard key={issuedBook.issued_book_id} issuedBook={issuedBook} onReturn={handleReturn} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No books match the selected status.
          </p>
        )}
      </div>
    </StudentLayout>
  );
}

