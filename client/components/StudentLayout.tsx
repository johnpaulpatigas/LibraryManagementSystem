// components/StudentLayout.tsx
"use client";
import AuthGuard from "@/components/AuthGuard";
import StudentHeader from "@/components/StudentHeader";
import { StudentSidebar } from "./StudentSidebar";

export default function StudentLayout({
  children,
  activePage,
  headerTitle,
}: {
  children: React.ReactNode;
  activePage: string;
  headerTitle: string;
}) {
  return (
    <AuthGuard isPrivate={true} role="user">
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <StudentSidebar activePage={activePage} />
        <div className="flex flex-1 flex-col">
          <StudentHeader title={headerTitle} />
          <div className="flex-1 space-y-8 overflow-y-auto p-8">
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
