"use client";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import {
  Book,
  BookMarked,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const libraryBooks = [
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Available",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Borrowed",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Available",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Available",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Borrowed",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Available",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Borrowed",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Available",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Available",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Available",
  },
  {
    id: 1,
    name: "Book 1",
    type: "Educational",
    language: "English",
    availability: "Borrowed",
  },
];

const LibraryLogo = () => (
  <div className="flex justify-center py-8">
    <svg
      width="80"
      height="80"
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

const StudentSidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/student/dashboard",
      active: false,
    },
    {
      name: "My Lists",
      icon: BookMarked,
      href: "/student/my-books",
      active: false,
    },
    {
      name: "Browse Books",
      icon: Book,
      href: "/student/browse",
      active: true,
    },
  ];

  return (
    <aside className="flex w-24 shrink-0 flex-col items-center bg-[#324646] text-gray-200">
      <LibraryLogo />
      <nav className="flex w-full flex-1 flex-col items-center space-y-4 px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={item.name}
            className={`flex h-16 w-16 items-center justify-center rounded-lg transition-colors ${
              item.active ? "bg-[#c8dcdc] text-black" : "hover:bg-slate-700"
            }`}
          >
            <item.icon className="h-7 w-7" />
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <Link
          href="/logout"
          title="Log Out"
          className="flex h-16 w-16 items-center justify-center rounded-lg transition-colors hover:bg-slate-700"
        >
          <LogOut className="h-7 w-7" />
        </Link>
      </div>
    </aside>
  );
};

const StudentHeader = ({
  onSettingsClick,
}: {
  onSettingsClick: () => void;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <User className="h-10 w-10 text-black" />
      <div>
        <h1 className="text-lg font-bold text-slate-800">John Doe</h1>
        <p className="text-sm text-slate-600">User</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right">
        <p className="font-semibold text-slate-800">12:00 AM</p>
        <p className="text-sm text-slate-500">Sep 27, 2025</p>
      </div>
      <button
        onClick={onSettingsClick}
        className="text-slate-600 hover:text-slate-900"
      >
        <Settings className="h-7 w-7" />
      </button>
    </div>
  </div>
);

export default function BrowseBooksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#c8dcdc] font-sans">
      <StudentSidebar />
      <main className="flex flex-1 flex-col gap-8 overflow-y-auto p-8">
        <StudentHeader onSettingsClick={() => setIsModalOpen(true)} />

        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-800">
              Library Lane Books
            </h2>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID or Type"
                className="rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 focus:ring-2 focus:ring-[#324646] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto rounded-2xl bg-[#e1e8e8] p-6 shadow-sm">
            <table className="w-full table-fixed text-left">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="w-[10%] p-4 font-semibold">ID</th>
                  <th className="w-[20%] p-4 font-semibold">Name</th>
                  <th className="w-[20%] p-4 font-semibold">Type</th>
                  <th className="w-[20%] p-4 font-semibold">Language</th>
                  <th className="w-[15%] p-4 font-semibold">Availability</th>
                  <th className="w-[15%] p-4 font-semibold">Add to shelf</th>
                </tr>
              </thead>
              <tbody>
                {libraryBooks.map((book, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 last:border-b-0"
                  >
                    <td className="p-4">{book.id}</td>
                    <td className="p-4">{book.name}</td>
                    <td className="p-4">{book.type}</td>
                    <td className="p-4">{book.language}</td>
                    <td className="p-4">{book.availability}</td>
                    <td className="p-4">
                      {book.availability === "Available" && (
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded border-gray-400 text-slate-600 focus:ring-slate-500"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <ChangePasswordModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
