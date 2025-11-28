// app/(admin)/a-dashboard/page.tsx
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
  PenSquare,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      active: true,
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

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="p-6 text-gray-800">
    <p className="text-sm text-gray-600">{title}</p>
    <p className="mt-1 text-4xl font-bold">{value}</p>
  </div>
);

export default function ReworkedAdminDashboard() {
  return (
    <AuthGuard isPrivate={true} role="admin">
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-8">
            <div className="grid grid-cols-1 divide-x-2 divide-gray-300/50 rounded-lg bg-gray-200/70 shadow-md md:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total User" value={3} />
              <StatCard title="Total Available Books" value={10} />
              <StatCard title="Active Book Request" value={0} />
              <StatCard title="Total Sales" value={110} />
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
