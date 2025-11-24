// app/student/browse/page.tsx
"use client";
import AuthGuard from "@/components/AuthGuard";
import StudentHeader from "@/components/StudentHeader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const allBooks = [
  {
    title: "A Midsummer Night's Dream",
    author: "William Shakespeare",
    category: "Classics",
    description: "Shakespeare's intertwined love polygons begin to get...",
    imageUrl: "https://images.gr-assets.com/books/1327179044l/9749964.jpg",
  },
  {
    title: "Paradise Lost",
    author: "John Milton",
    category: "Poetry",
    description: "John Milton's Paradise Lost is one of the greatest epic...",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Paradise_Lost_frontispiece.jpg/800px-Paradise_Lost_frontispiece.jpg",
  },
  {
    title: "The Imaginary Invalid",
    author: "Molière",
    category: "Classics",
    description: "To reduce his medical fees, hypochondriac M. Argan...",
    imageUrl: "https://images.gr-assets.com/books/1426101967l/25131499.jpg",
  },
  {
    title: "The Pilgrim's Progress",
    author: "John Bunyan",
    category: "Christian",
    description: "This famous story of man's progress through life in...",
    imageUrl: "https://images.gr-assets.com/books/1388204797l/214936.jpg",
  },
  {
    title: "Fuente Ovejuna",
    author: "Lope de Vega, Juan María Marín",
    category: "Plays",
    description: "Lope de Vega trazó en Fuente Ovejuna, con magnífi...",
    imageUrl: "https://images.gr-assets.com/books/1347313042l/1131972.jpg",
  },
  {
    title: "Phaedra",
    author: "Jean Racine, Richard Wilbur",
    category: "Drama",
    description: "A brilliant translation of one of the most influential...",
    imageUrl: "https://images.gr-assets.com/books/1348259163l/57663.jpg",
  },
];

const LibraryLogo = () => (
  <div className="flex justify-center py-6">
    <svg
      width="60"
      height="60"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="20" r="15" fill="#6EC67B" />
      <path
        d="M10 95 C 20 70, 40 60, 50 60 C 60 60, 80 70, 90 95 L 90 30 C 90 30, 50 10, 50 10 C 50 10, 10 30, 10 30 Z"
        fill="#6EC67B"
      />
    </svg>
  </div>
);

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", href: "/student/dashboard", active: false },
    { name: "Browse Books", href: "/student/browse", active: true },
    { name: "Book Request", href: "/student/book-request", active: false },
    { name: "Issued Books", href: "/student/my-books", active: false },
    { name: "Invoices", href: "/student/invoices", active: false },
  ];
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[#2A4B4B] text-gray-300">
      <LibraryLogo />
      <nav className="flex flex-col text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`px-6 py-3 transition-colors ${item.active ? "bg-[#AEC7C7] font-bold text-black" : "hover:bg-gray-700"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const BookCard = ({ book }: { book: (typeof allBooks)[0] }) => {
  const categoryColors: { [key: string]: string } = {
    Classics: "text-green-700",
    Poetry: "text-blue-700",
    Christian: "text-yellow-700",
    Plays: "text-purple-700",
    Drama: "text-red-700",
  };

  return (
    <div className="transform overflow-hidden rounded-lg bg-[#EAE8E3] shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={book.imageUrl}
          alt={`Cover of ${book.title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <p
          className={`text-sm font-semibold ${categoryColors[book.category] || "text-gray-600"}`}
        >
          {book.category}
        </p>
        <h3 className="mt-1 text-lg font-bold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="mt-2 h-10 overflow-hidden text-sm text-gray-700">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default function BrowseBooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(allBooks.map((book) => book.category))];

  const filteredBooks = allBooks.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AuthGuard isPrivate={true} role="user">
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <StudentHeader title="Browse Books" />
          <main className="flex-1 overflow-y-auto p-8">
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
              {filteredBooks.map((book) => (
                <BookCard key={book.title} book={book} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
