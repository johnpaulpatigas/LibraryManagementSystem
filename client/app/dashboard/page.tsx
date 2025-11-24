"use client";
import AuthGuard from "@/components/AuthGuard";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import {
  BookCopy,
  BookOpen,
  LayoutDashboard,
  LogOut,
  RefreshCw,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { FC, SVGProps } from "react";
import { useState } from "react";

const admins = [
  { id: 1, name: "Group 3", adminId: 1, active: true },
  { id: 2, name: "Kim Jisoo", adminId: 1, active: true },
  { id: 3, name: "Kim Jisoo", adminId: 1, active: true },
];

const overdueBorrowers = [
  { id: 1, name: "Kim Jisoo", borrowedId: 1 },
  { id: 2, name: "Kim Jisoo", borrowedId: 1 },
  { id: 3, name: "Kim Jisoo", borrowedId: 1 },
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

const StatCard = ({
  icon: Icon,
  title,
  value,
}: {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  value: string;
}) => (
  <div className="flex items-center gap-6 rounded-2xl bg-[#e1e8e8] p-6 shadow-sm">
    <div className="rounded-lg bg-slate-300 p-4">
      <Icon className="h-8 w-8 text-black" />
    </div>
    <div>
      <p className="text-4xl font-bold text-slate-800">{value}</p>
      <p className="text-slate-600">{title}</p>
    </div>
  </div>
);

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: true,
    },
    { name: "Catalog", icon: BookCopy, href: "/catalog", active: false },
    { name: "Books", icon: BookOpen, href: "/books", active: false },
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

const DashboardHeader = ({
  onSettingsClick,
}: {
  onSettingsClick: () => void;
}) => (
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

const AdminList = () => (
  <div className="space-y-4 rounded-2xl bg-[#e1e8e8] p-6 shadow-sm">
    <h2 className="text-center text-lg font-bold tracking-wider text-slate-800">
      ADMINS
    </h2>
    <div className="space-y-3">
      {admins.map((admin) => (
        <div
          key={admin.id}
          className="flex items-center justify-between rounded-xl border border-slate-300 bg-white/90 p-3"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-black p-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="h-10 border-l border-slate-300"></div>
            <div>
              <p className="font-bold text-slate-800">{admin.name}</p>
              <p className="text-xs text-slate-500">
                Admin ID : {admin.adminId}
              </p>
              {admin.active && (
                <p className="flex items-center text-xs text-green-600">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>{" "}
                  Active
                </p>
              )}
            </div>
          </div>
          <button className="text-slate-500 hover:text-slate-800">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const OverdueBorrowersList = () => (
  <div className="space-y-4 rounded-2xl bg-[#e1e8e8] p-6 shadow-sm">
    <h2 className="text-center text-lg font-bold tracking-wider text-slate-800">
      OVERDUE BORROWERS
    </h2>
    <div className="space-y-3">
      {overdueBorrowers.map((borrower) => (
        <div
          key={borrower.id}
          className="flex items-center justify-between rounded-xl border border-slate-300 bg-white/90 p-3"
        >
          <div className="flex items-center gap-4">
            <User className="h-8 w-8 text-black" />
            <div className="h-10 border-l border-slate-300"></div>
            <div>
              <p className="font-bold text-slate-800">{borrower.name}</p>
              <p className="text-xs text-slate-500">
                Borrowed ID : {borrower.borrowedId}
              </p>
            </div>
          </div>
          <button className="text-slate-500 hover:text-slate-800">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthGuard isPrivate={true} role="admin">
      <div className="flex h-screen bg-[#c8dcdc] font-sans">
        <Sidebar />
        <main className="flex-1 space-y-8 overflow-y-auto p-8">
          <DashboardHeader onSettingsClick={() => setIsModalOpen(true)} />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <StatCard icon={User} title="Total User Base" value="150" />
            <StatCard icon={BookCopy} title="Total Book Count" value="1150" />
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <AdminList />
            <OverdueBorrowersList />
          </div>
        </main>

        {isModalOpen && (
          <ChangePasswordModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </AuthGuard>
  );
}
