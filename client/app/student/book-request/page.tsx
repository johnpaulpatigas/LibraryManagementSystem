// app/student/book-request/page.tsx
"use client";
import AuthGuard from "@/components/AuthGuard";
import StudentHeader from "@/components/StudentHeader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const requestedBooks = [
  {
    title: "A Midsummer Night's Dream",
    author: "William Shakespeare",
    category: "Classics",
    imageUrl: "https://images.gr-assets.com/books/1327179044l/9749964.jpg",
    status: "Approved",
  },
  {
    title: "Paradise Lost",
    author: "John Milton",
    category: "Poetry",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Paradise_Lost_frontispiece.jpg/800px-Paradise_Lost_frontispiece.jpg",
    status: "Approved",
  },
  {
    title: "The Imaginary Invalid",
    author: "Molière",
    category: "Classics",
    imageUrl: "https://images.gr-assets.com/books/1426101967l/25131499.jpg",
    status: "Rejected",
  },
  {
    title: "The Pilgrim's Progress",
    author: "John Bunyan",
    category: "Christian",
    imageUrl: "https://images.gr-assets.com/books/1388204797l/214936.jpg",
    status: "Pending",
  },
  {
    title: "Fuente Ovejuna",
    author: "Lope de Vega, Juan María Marín",
    category: "Plays",
    imageUrl: "https://images.gr-assets.com/books/1347313042l/1131972.jpg",
    status: "Approved",
  },
  {
    title: "Phaedra",
    author: "Jean Racine, Richard Wilbur",
    category: "Drama",
    imageUrl: "https://images.gr-assets.com/books/1348259163l/57663.jpg",
    status: "Approved",
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
    { name: "Browse Books", href: "/student/browse", active: false },
    { name: "Book Request", href: "/student/book-request", active: true },
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

const StatusBadge = ({
  status,
}: {
  status: "Approved" | "Pending" | "Rejected";
}) => {
  const statusStyles = {
    Approved: "bg-green-500 text-white",
    Pending: "bg-orange-400 text-white",
    Rejected: "bg-red-500 text-white",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

const BookCard = ({ book }: { book: (typeof requestedBooks)[0] }) => {
  const categoryColors: { [key: string]: string } = {
    Classics: "text-green-700",
    Poetry: "text-blue-700",
    Christian: "text-yellow-700",
    Plays: "text-purple-700",
    Drama: "text-red-700",
  };

  return (
    <div className="overflow-hidden rounded-lg bg-[#EAE8E3] shadow-lg">
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
        <p className="mb-3 text-sm text-gray-600">{book.author}</p>
        <StatusBadge
          status={book.status as "Approved" | "Pending" | "Rejected"}
        />
      </div>
    </div>
  );
};

export default function BookRequestPage() {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const statuses = [
    "All",
    ...new Set(requestedBooks.map((book) => book.status)),
  ];

  const filteredBooks = requestedBooks.filter((book) => {
    return selectedStatus === "All" || book.status === selectedStatus;
  });

  return (
    <AuthGuard isPrivate={true} role="user">
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <StudentHeader title="Book Request" />
          <main className="flex-1 overflow-y-auto p-8">
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
