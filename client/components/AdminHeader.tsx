// components/AdminHeader.tsx
"use client";
import { LogOut, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export const LibraryLogo = () => (
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

export const AdminHeader = () => {
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
          <h1 className="text-xl font-bold">Admin</h1>
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
