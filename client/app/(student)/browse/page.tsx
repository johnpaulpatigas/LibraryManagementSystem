// app/(student)/browse/page.tsx
"use client";
import StudentLayout from "@/components/StudentLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBooks } from "@/lib/services/books";
import BookDetailsModal from "@/components/BookDetailsModal";

const BookCard = ({ book, onClick }: { book: any, onClick: () => void }) => {
  const categoryColors: { [key: string]: string } = {
    Classics: "text-green-700",
    Poetry: "text-blue-700",
    Christian: "text-yellow-700",
    Plays: "text-purple-700",
    Drama: "text-red-700",
    Romance: "text-pink-700",
    // Add more categories and colors as needed
  };

  const primaryCategory = book.categories && book.categories.length > 0 ? book.categories[0].name : "Unknown";
  const primaryAuthor = book.authors && book.authors.length > 0 ? book.authors[0].name : "Unknown";

  return (
    <div onClick={onClick} className="transform cursor-pointer overflow-hidden rounded-lg bg-[#EAE8E3] shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={book.image_url || `https://picsum.photos/seed/${book.id}/200/300`} // Use image_url or Placeholder image
          alt={`Cover of ${book.title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <p
          className={`text-sm font-semibold ${
            categoryColors[primaryCategory] || "text-gray-600"
          }`}
        >
          {primaryCategory}
        </p>
        <h3 className="mt-1 text-lg font-bold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-600">{primaryAuthor}</p>
        <p className="mt-2 h-10 overflow-hidden text-sm text-gray-700">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default function BrowseBooksPage() {
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState(["All"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const booksRes = await getBooks();
        setAllBooks(booksRes.data);

        // Extract unique categories from fetched books
        const uniqueCategories = [
          ...new Set(
            booksRes.data.flatMap((book: any) =>
              book.categories.map((cat: any) => cat.name),
            ),
          ),
        ];
        setCategories(["All", ...(uniqueCategories as string[])]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  const filteredBooks = allBooks.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" ||
      book.categories.some((cat: any) => cat.name === selectedCategory);
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.some((author: any) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <StudentLayout activePage="Browse Books" headerTitle="Browse Books">
      <div className="mb-8 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search Book"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 rounded-lg border border-gray-400 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#587878] focus:outline-none"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-gray-400 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#587878] focus:outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onClick={() => handleBookClick(book)} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No available books found.</p>
        )}
      </div>
      <BookDetailsModal open={isModalOpen} onOpenChange={setIsModalOpen} book={selectedBook} onFinished={handleModalClose} />
    </StudentLayout>
  );
}
