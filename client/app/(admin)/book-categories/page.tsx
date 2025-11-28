// app/(admin)/book-categories/page.tsx
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
import Link from "next/link";
import { useRouter } from "next/navigation";

const categoriesData = [
  { id: 1, name: "Drama", created: "23/11/2025", updated: "23/11/2025" },
  { id: 2, name: "Classic", created: "21/11/2025", updated: "23/11/2025" },
  { id: 3, name: "Poetry", created: "19/11/2025", updated: "23/11/2025" },
  { id: 4, name: "Plays", created: "07/11/2025", updated: "23/11/2025" },
  { id: 5, name: "Fiction", created: "23/11/2025", updated: "23/11/2025" },
  { id: 6, name: "Christian", created: "23/11/2025", updated: "23/11/2025" },
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
      active: false,
    },
    {
      name: "Book Categories",
      href: "/book-categories",
      icon: List,
      active: true,
    },
    {
      name: "Book Authors",
      href: "/book-authors",
      icon: PenSquare,
      active: false,
    },
    {
      name: "Book Request",
      href: "a-book-request",
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

export default function BookCategoriesPage() {
  return (
    <AuthGuard isPrivate={true} role="admin">
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">
                Book Categories
              </h1>
              <button className="flex items-center gap-2 rounded-md bg-[#587878] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#4a6666]">
                <Plus className="h-5 w-5" />
                <span>Add Category</span>
              </button>
            </div>

            {/* Controls */}
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

            {/* Categories Table */}
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <table className="w-full text-left">
                <thead className="bg-[#7A9999] text-white">
                  <tr>
                    <th className="p-4 font-semibold">No.</th>
                    <th className="p-4 font-semibold">Category Name</th>
                    <th className="p-4 font-semibold">Created Date</th>
                    <th className="p-4 font-semibold">Updated Date</th>
                    <th className="p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesData.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-800">{category.id}</td>
                      <td className="p-4 font-medium text-gray-800">
                        {category.name}
                      </td>
                      <td className="p-4 text-gray-600">{category.created}</td>
                      <td className="p-4 text-gray-600">{category.updated}</td>
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

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-end text-sm text-gray-700">
              <button className="rounded-md px-3 py-1 hover:bg-gray-200">
                Previous
              </button>
              <span className="mx-2 rounded-md bg-[#587878] px-3 py-1 text-white">
                1
              </span>
              <button className="rounded-md px-3 py-1 hover:bg-gray-200">
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
