// app/student/dashboard/page.tsx
"use client";
import AuthWrapper from "@/components/AuthWrapper";
import StudentHeader from "@/components/StudentHeader";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    { name: "Dashboard", href: "/student/dashboard", active: true },
    { name: "Browse Books", href: "/student/browse", active: false },
    { name: "Book Request", href: "/student/book-request", active: false },
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
            className={`px-6 py-3 transition-colors ${
              item.active
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

type StatItemProps = {
  label: string;
  value: number;
  color: "orange" | "green" | "red";
};

const StatItem = ({ label, value, color }: StatItemProps) => {
  const colorClasses = {
    orange: "text-orange-500",
    green: "text-green-600",
    red: "text-red-600",
  };
  return (
    <div className="flex justify-between">
      <span className={colorClasses[color]}>{label}</span>
      <span className={`font-bold ${colorClasses[color]}`}>{value}</span>
    </div>
  );
};

const StatCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg bg-[#FDFBF6] p-6 shadow-md">
    <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
    <div className="text-md space-y-2">{children}</div>
  </div>
);

const WelcomeBanner = () => {
  const [userName, setUserName] = useState("User");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserName(JSON.parse(storedUser).fullname || "User");
    }
  }, []);

  return (
    <div className="rounded-lg bg-[#FDFBF6] p-4 shadow">
      <h1 className="text-2xl text-gray-800">Hey there! {userName}</h1>
    </div>
  );
};

export default function StudentDashboardPage() {
  return (
    <AuthWrapper>
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <StudentHeader title="Dashboard" />
          <main className="flex-1 space-y-8 overflow-y-auto p-8">
            <WelcomeBanner />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <StatCard title="Books">
                <StatItem label="Total:" value={0} color="orange" />
                <StatItem label="Available:" value={0} color="green" />
                <StatItem label="Inactive:" value={0} color="red" />
              </StatCard>

              <StatCard title="Issued-Books">
                <StatItem label="On-going:" value={0} color="orange" />
                <StatItem label="Returned:" value={0} color="green" />
                <StatItem label="Overdue:" value={0} color="red" />
              </StatCard>

              <StatCard title="Book Request">
                <StatItem label="Approved:" value={0} color="green" />
                <StatItem label="Pending:" value={0} color="orange" />
                <StatItem label="Rejected:" value={0} color="red" />
              </StatCard>

              <StatCard title="Invoice">
                <StatItem label="Over-the-counter:" value={0} color="orange" />
                <StatItem label="Paid:" value={0} color="green" />
                <StatItem label="Unpaid:" value={0} color="red" />
              </StatCard>
            </div>
          </main>
        </div>
      </div>
    </AuthWrapper>
  );
}
