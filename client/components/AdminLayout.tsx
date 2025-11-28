// components/AdminLayout.tsx
"use client";
import AuthGuard from "@/components/AuthGuard";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export default function AdminLayout({
  children,
  activePage,
}: {
  children: React.ReactNode;
  activePage: string;
}) {
  return (
    <AuthGuard isPrivate={true} role="admin">
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <AdminSidebar activePage={activePage} />
        <div className="flex flex-1 flex-col">
          <AdminHeader />
          <div className="flex-1 overflow-y-auto p-8">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
