// components/StudentHeader.tsx
"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function StudentHeader({ title }: { title: string }) {
  const [userName, setUserName] = useState("User");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserName(userData.fullname || "User");
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    router.push("/");
  };

  return (
    <header className="relative flex items-center justify-between bg-[#587878] p-4 text-white">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-black/20"
        >
          <span>{userName}</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-[#AEC7C7] shadow-xl">
            <div className="py-1">
              <Link
                href="/student/settings"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#587878] hover:text-white"
                onClick={() => setIsDropdownOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-[#587878] hover:text-white"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
