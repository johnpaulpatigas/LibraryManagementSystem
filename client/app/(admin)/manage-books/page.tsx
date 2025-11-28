// app/(admin)/manage-books/page.tsx
"use client";
import AuthGuard from "@/components/AuthGuard";
import {
  BookOpen,
  BookOpenCheck,
  HelpCircle,
  History,
  LayoutDashboard,
  List,
  LogOut,
  Pencil,
  PenSquare,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const booksData = [
  {
    id: 1,
    title: "A Midsummer Night's Dream",
    category: "Classic",
    author: "William Shakespeare",
    qty: 5,
    fees: 10,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1606142232l/11139.jpg",
  },
  {
    id: 2,
    title: "Paradise's Lost",
    category: "Poetry",
    author: "John Milton",
    qty: 8,
    fees: 12,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657613854l/15998.jpg",
  },
  {
    id: 3,
    title: "Call me by Your Name",
    category: "Romance",
    author: "Andre Aciman",
    qty: 3,
    fees: 100,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490216556l/34884922.jpg",
  },
  {
    id: 4,
    title: "5 Feet Apart",
    category: "Romance",
    author: "Rachael Lippincott",
    qty: 5,
    fees: 10,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522223067l/39939417.jpg",
  },
  {
    id: 5,
    title: "Paradise's Lost",
    category: "Poetry",
    author: "John Milton",
    qty: 8,
    fees: 12,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657613854l/15998.jpg",
  },
  {
    id: 6,
    title: "A Midsummer Night's Dream",
    category: "Classic",
    author: "William Shakespeare",
    qty: 5,
    fees: 10,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1606142232l/11139.jpg",
  },
  {
    id: 7,
    title: "Call me by Your Name",
    category: "Romance",
    author: "Andre Aciman",
    qty: 3,
    fees: 100,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490216556l/34884922.jpg",
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

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between bg-[#587878] p-4 px-8 text-white">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8" />
        <div>
          <h1 className="text-xl font-bold">Group 3</h1>
          <p className="text-xs">Admin</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-md p-2 font-semibold transition-colors hover:bg-black/20"
      >
        <LogOut className="h-5 w-5" />
        <span>Log Out</span>
      </button>
    </header>
  );
};

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      href: "/a-dashboard",
      icon: LayoutDashboard,
      active: false,
    },
    {
      name: "Manage Books",
      href: "/manage-books",
      icon: BookOpen,
      active: true,
    },
    {
      name: "Book Categories",
      href: "/book-categories",
      icon: List,
      active: false,
    },
    {
      name: "Book Authors",
      href: "/book-authors",
      icon: PenSquare,
      active: false,
    },
    {
      name: "Book Request",
      href: "/a-book-request",
      icon: HelpCircle,
      active: false,
    },
    {
      name: "Issued Books",
      href: "/issued-books",
      icon: BookOpenCheck,
      active: false,
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: History,
      active: false,
    },
    {
      name: "User Management",
      href: "/user-management",
      icon: Users,
      active: false,
    },
  ];
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-[#2A4B4B] text-gray-300">
      <LibraryLogo />
      <nav className="mt-4 flex flex-col text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-4 px-6 py-3 transition-colors ${item.active ? "bg-[#C8DCDC] font-bold text-black" : "hover:bg-gray-700/50"}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default function ManageBooksPage() {
  return (
    <AuthGuard isPrivate={true} role="admin">
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">Manage Books</h1>
              <button className="flex items-center gap-2 rounded-md bg-[#587878] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#4a6666]">
                <Plus className="h-5 w-5" />
                <span>Add Books</span>
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>Show</span>
                <select className="rounded-md border border-gray-300 px-2 py-1 focus:ring-2 focus:ring-[#587878] focus:outline-none">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <span>entries</span>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-64 rounded-md border border-gray-300 px-3 py-1.5 focus:ring-2 focus:ring-[#587878] focus:outline-none"
              />
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <table className="w-full text-left">
                <thead className="bg-[#587878] text-white">
                  <tr>
                    <th className="p-4 font-semibold">No.</th>
                    <th className="p-4 font-semibold">Image</th>
                    <th className="p-4 font-semibold">Book Name</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Author</th>
                    <th className="p-4 font-semibold">Qty</th>
                    <th className="p-4 font-semibold">Fees</th>
                    <th className="p-4 font-semibold">Activate</th>
                    <th className="p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {booksData.map((book) => (
                    <tr
                      key={book.id}
                      className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-800">{book.id}</td>
                      <td className="p-4">
                        <Image
                          src={book.imageUrl}
                          alt={book.title}
                          width={40}
                          height={60}
                          className="rounded-md object-cover"
                        />
                      </td>
                      <td className="p-4 font-medium text-gray-800">
                        {book.title}
                      </td>
                      <td className="p-4 text-gray-600">{book.category}</td>
                      <td className="p-4 text-gray-600">{book.author}</td>
                      <td className="p-4 text-gray-800">{book.qty}</td>
                      <td className="p-4 text-gray-800">{book.fees}</td>
                      <td className="p-4">
                        <button className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white hover:bg-green-600">
                          Activate
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button className="text-gray-500 hover:text-blue-600">
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button className="text-gray-500 hover:text-red-600">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
