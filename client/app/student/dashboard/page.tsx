"use client";
import {
  Book,
  BookMarked,
  LayoutDashboard,
  LogOut,
  MousePointerClick,
  Settings,
  Undo2,
  User,
} from "lucide-react";
import Link from "next/link";

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

const StudentSidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/student/dashboard",
      active: true,
    },
    {
      name: "My Lists",
      icon: BookMarked,
      href: "/student/my-books",
      active: false,
    },
    {
      name: "Browse Books",
      icon: Book,
      href: "/student/browse",
      active: false,
    },
  ];

  return (
    <aside className="flex w-24 shrink-0 flex-col items-center bg-[#324646] text-gray-200">
      <LibraryLogo />
      <nav className="flex w-full flex-1 flex-col items-center space-y-4 px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={item.name}
            className={`flex h-16 w-16 items-center justify-center rounded-lg transition-colors ${
              item.active ? "bg-[#c8dcdc] text-black" : "hover:bg-slate-700"
            }`}
          >
            <item.icon className="h-7 w-7" />
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <Link
          href="/logout"
          title="Log Out"
          className="flex h-16 w-16 items-center justify-center rounded-lg transition-colors hover:bg-slate-700"
        >
          <LogOut className="h-7 w-7" />
        </Link>
      </div>
    </aside>
  );
};

const StudentHeader = () => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <User className="h-10 w-10 text-black" />
      <div>
        <h1 className="text-lg font-bold text-slate-800">John Doe</h1>
        <p className="text-sm text-slate-600">User</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right">
        <p className="font-semibold text-slate-800">12:00 AM</p>
        <p className="text-sm text-slate-500">Sep 27, 2025</p>
      </div>
      <button className="text-slate-600 hover:text-slate-900">
        <Settings className="h-7 w-7" />
      </button>
    </div>
  </div>
);

const NavCard = ({
  icon: Icon,
  title,
  href,
}: {
  icon: React.ElementType;
  title: string;
  href: string;
}) => (
  <Link href={href}>
    <div className="flex cursor-pointer items-center gap-6 rounded-2xl bg-[#d1d9d9] p-6 shadow-md transition-all hover:bg-slate-300 hover:shadow-lg">
      <div className="rounded-lg bg-slate-400/50 p-4">
        <Icon className="h-10 w-10 text-black" />
      </div>
      <p className="text-2xl font-semibold text-slate-800">{title}</p>
    </div>
  </Link>
);

export default function StudentDashboardPage() {
  return (
    <div className="flex h-screen bg-[#c8dcdc] font-sans">
      <StudentSidebar />
      <main className="flex flex-1 flex-col gap-12 overflow-y-auto p-8">
        <StudentHeader />

        <div className="flex flex-1 items-start justify-center gap-12 pt-10">
          <div className="flex w-full max-w-md flex-col gap-8">
            <NavCard
              href="/student/my-books?view=borrowed"
              icon={BookMarked}
              title="Your Borrowed Book List"
            />
            <NavCard
              href="/student/my-books?view=returned"
              icon={Undo2}
              title="Your Returned Book List"
            />
            <NavCard
              href="/student/browse"
              icon={MousePointerClick}
              title="Browse Available Book Inventory"
            />
          </div>

          <div className="w-full max-w-lg rounded-2xl bg-[#e1e8e8] p-10 shadow-md">
            <blockquote className="text-center text-xl leading-relaxed text-slate-700 italic">
              &quot;Embarking on the journey of reading fosters personal growth,
              nurturing a path towards excellence and the refinement of
              character&quot;
            </blockquote>
            <p className="mt-6 text-right font-medium text-slate-600">— CTTO</p>
          </div>
        </div>
      </main>
    </div>
  );
}
