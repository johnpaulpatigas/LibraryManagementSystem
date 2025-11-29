// components/StudentSidebar.tsx
"use client";
import Link from "next/link";

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

const navItems = [
  { name: "Dashboard", href: "/s-dashboard" },
  { name: "Browse Books", href: "/browse" },
  { name: "Book Request", href: "/s-book-request" },
  { name: "Issued Books", href: "/my-books" },

];

export const StudentSidebar = ({ activePage }: { activePage: string }) => {
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[#2A4B4B] text-gray-300">
      <LibraryLogo />
      <nav className="flex flex-col text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`px-6 py-3 transition-colors ${
              activePage === item.name
                ? "bg-[#AEC7C7] font-bold text-black"
                : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
