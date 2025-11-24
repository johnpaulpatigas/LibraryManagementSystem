"use client";
import AuthGuard from "@/components/AuthGuard";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import {
  BookCopy,
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  Pencil,
  Plus,
  Search,
  Settings,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const books = Array(12).fill({
  id: 1,
  userId: "Book 1",
  name: "Educational",
  language: "English",
  availability: "Available",
});

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

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: false,
    },
    { name: "Catalog", icon: BookCopy, href: "/catalog", active: false },
    { name: "Books", icon: BookOpen, href: "/books", active: true },
    { name: "Users", icon: Users, href: "/users", active: false },
  ];

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-[#324646] text-gray-200">
      <LibraryLogo />
      <nav className="flex-1 space-y-2 px-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-colors ${
              item.active
                ? "bg-[#c8dcdc] font-semibold text-black"
                : "hover:bg-slate-700"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <Link
          href="/logout"
          className="flex w-full items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-slate-700"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </Link>
      </div>
    </aside>
  );
};

const PageHeader = ({ onSettingsClick }: { onSettingsClick: () => void }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-black p-2">
        <Shield className="h-6 w-6 text-white" />
      </div>
      <div>
        <h1 className="text-lg font-bold text-slate-800">Group 3</h1>
        <p className="text-sm text-slate-600">Admin</p>
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

export default function BooksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthGuard isPrivate={true} role="admin">
      <div className="flex h-screen bg-[#c8dcdc] font-sans">
        <Sidebar />
        <main className="flex flex-1 flex-col gap-8 overflow-y-auto p-8">
          <PageHeader onSettingsClick={() => setIsModalOpen(true)} />

          <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-800">
                Book Management
              </h2>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 rounded-lg bg-[#324646] px-4 py-2 text-white transition-colors hover:bg-[#2a3a3a]">
                  <Plus className="h-5 w-5" />
                  Add Book
                </button>
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by ID or Type"
                    className="rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 focus:ring-2 focus:ring-[#324646] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto rounded-2xl bg-[#e1e8e8] p-6 shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="p-4 font-semibold">ID</th>
                    <th className="p-4 font-semibold">User ID</th>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Language</th>
                    <th className="p-4 font-semibold">Availability</th>
                    <th className="p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 last:border-b-0"
                    >
                      <td className="p-4">{book.id}</td>
                      <td className="p-4">{book.userId}</td>
                      <td className="p-4">{book.name}</td>
                      <td className="p-4">{book.language}</td>
                      <td className="p-4">{book.availability}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button className="text-slate-600 hover:text-slate-900">
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button className="text-slate-600 hover:text-red-600">
                            <Trash2 className="h-5 w-5" />
                          </button>
                          <button className="text-slate-600 hover:text-slate-900">
                            <FileText className="h-5 w-5" />
                          </button>
                        </div>
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
    </AuthGuard>
  );
}
