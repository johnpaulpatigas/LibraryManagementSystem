// components/AdminSidebar.tsx
"use client";
import {
  BookOpen,
  BookOpenCheck,
  HelpCircle,
  History,
  LayoutDashboard,
  List,
  PenSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import { LibraryLogo } from "./AdminHeader";

const navItems = [
  {
    name: "Dashboard",
    href: "/a-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Books",
    href: "/manage-books",
    icon: BookOpen,
  },
  {
    name: "Book Categories",
    href: "/book-categories",
    icon: List,
  },
  {
    name: "Book Authors",
    href: "/book-authors",
    icon: PenSquare,
  },
  {
    name: "Book Request",
    href: "/a-book-request",
    icon: HelpCircle,
  },
  {
    name: "Issued Books",
    href: "/issued-books",
    icon: BookOpenCheck,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: History,
  },
  {
    name: "User Management",
    href: "/user-management",
    icon: Users,
  },
];

export const AdminSidebar = ({ activePage }: { activePage: string }) => {
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-[#2A4B4B] text-gray-300">
      <LibraryLogo />
      <nav className="mt-4 flex flex-col text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-4 px-6 py-3 transition-colors ${
              activePage === item.name
                ? "bg-[#C8DCDC] font-bold text-black"
                : "hover:bg-gray-700/50"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
