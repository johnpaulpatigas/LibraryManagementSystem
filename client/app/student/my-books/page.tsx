"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  BookMarked,
  Book,
  LogOut,
  User,
  Settings,
  Search,
  FileText,
  ChevronLeft,
} from "lucide-react";

const borrowedBooksData = Array(12).fill({
  id: "001",
  userId: "001",
  amount: "002 Books",
  dueDate: "18-10-2025",
  dateTime: "25-09-2025",
});

const returnedBooksData = Array(12).fill({
  id: "001",
  userId: "001",
  amount: "002 Books",
  dueDate: "08-10-2025",
  dateTime: "25-09-2025 10:08 PM",
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
      active: true,
    },
    {
      name: "Browse Books",
      icon: Book,
      href: "/student/browse",
      active: false,
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

const StudentHeader = () => (
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
      <button className="text-slate-600 hover:text-slate-900">
        <Settings className="h-7 w-7" />
      </button>
    </div>
  </div>
);

export default function MyBooksPage() {
  const [view, setView] = useState("initial");
  const [activeTab, setActiveTab] = useState("borrowed");

  const handleShowTable = (tab: string) => {
    setActiveTab(tab);
    setView("table");
  };

  const handleGoBack = () => {
    setView("initial");
  };

  const currentData =
    activeTab === "borrowed" ? borrowedBooksData : returnedBooksData;

  return (
    <div className="flex h-screen bg-[#c8dcdc] font-sans">
      <StudentSidebar />
      <main className="flex flex-1 flex-col gap-8 overflow-y-auto p-8">
        <StudentHeader />

        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {view === "table" && (
                <button
                  onClick={handleGoBack}
                  className="rounded-full p-2 transition-colors hover:bg-gray-300"
                >
                  <ChevronLeft className="h-6 w-6 text-slate-700" />
                </button>
              )}
              <button
                onClick={() => handleShowTable("borrowed")}
                className={`rounded-lg px-6 py-2 font-semibold transition-colors ${
                  activeTab === "borrowed" && view === "table"
                    ? "bg-[#324646] text-white"
                    : "bg-[#d1d9d9] text-slate-700"
                }`}
              >
                Borrowed Books
              </button>
              <button
                onClick={() => handleShowTable("returned")}
                className={`rounded-lg px-6 py-2 font-semibold transition-colors ${
                  activeTab === "returned" && view === "table"
                    ? "bg-[#324646] text-white"
                    : "bg-[#d1d9d9] text-slate-700"
                }`}
              >
                Returned Books
              </button>
            </div>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID"
                className="rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 focus:ring-2 focus:ring-[#324646] focus:outline-none"
              />
            </div>
          </div>

          {view === "initial" ? (
            <div className="flex flex-1 items-center justify-center p-4">
              <div className="relative h-full max-h-[60vh] w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop"
                  alt="Bookshelf"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto rounded-2xl bg-[#e1e8e8] p-6 shadow-sm">
              <table className="w-full table-fixed text-left">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="w-[10%] p-4 font-semibold">ID</th>
                    <th className="w-[10%] p-4 font-semibold">User ID</th>
                    <th className="w-[15%] p-4 font-semibold">Amount</th>
                    <th className="w-[20%] p-4 font-semibold">Due Date</th>
                    <th className="w-[30%] p-4 font-semibold">Date & Time</th>
                    <th className="w-[15%] p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((book, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 last:border-b-0"
                    >
                      <td className="truncate p-4">{book.id}</td>
                      <td className="truncate p-4">{book.userId}</td>
                      <td className="truncate p-4">{book.amount}</td>
                      <td className="truncate p-4">{book.dueDate}</td>
                      <td className="truncate p-4">{book.dateTime}</td>
                      <td className="p-4">
                        {activeTab === "borrowed" ? (
                          <button className="rounded-md bg-[#324646] px-4 py-1.5 text-sm text-white transition-colors hover:bg-[#2a3a3a]">
                            Return
                          </button>
                        ) : (
                          <button className="text-slate-600 hover:text-slate-900">
                            <FileText className="h-5 w-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
