// app/student/settings/page.tsx
"use client";
import AuthWrapper from "@/components/AuthWrapper";
import StudentHeader from "@/components/StudentHeader";
import Link from "next/link";
import { useState } from "react";

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
    { name: "Dashboard", href: "/student/dashboard" },
    { name: "Browse Books", href: "/student/browse" },
    { name: "Book Request", href: "/student/book-request" },
    { name: "Issued Books", href: "/student/my-books" },
    { name: "Invoices", href: "/student/invoices" },
  ];
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[#2A4B4B] text-gray-300">
      <LibraryLogo />
      <nav className="flex flex-col text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-6 py-3 transition-colors hover:bg-gray-700"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const SettingsCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg bg-[#EAE8E3] p-8 shadow-md">
    <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving profile:", { name, email });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating password...");
  };

  return (
    <AuthWrapper>
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <StudentHeader title="Settings" />
          <main className="flex-1 space-y-8 overflow-y-auto p-8">
            <SettingsCard title="Profile Information">
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </SettingsCard>

            <SettingsCard title="Update Password">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </SettingsCard>
          </main>
        </div>
      </div>
    </AuthWrapper>
  );
}
