// app/student/invoices/page.tsx
"use client";
import AuthWrapper from "@/components/AuthWrapper";
import StudentHeader from "@/components/StudentHeader";
import Link from "next/link";

const invoicesData = [
  {
    id: 1,
    bookId: "Book 01",
    bookName: "A Midsummer Night's dream",
    bookFee: 10,
    status: "Paid",
  },
  {
    id: 2,
    bookId: "Book 02",
    bookName: "Paradise Lost",
    bookFee: 10,
    status: "Paid",
  },
  {
    id: 3,
    bookId: "Book 03",
    bookName: "Fuente Ovejuna",
    bookFee: 10,
    status: "Paid",
  },
  {
    id: 4,
    bookId: "Book 04",
    bookName: "The Pilgrim's Progress",
    bookFee: 10,
    status: "Unpaid",
  },
];

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
    { name: "Dashboard", href: "/student/dashboard", active: false },
    { name: "Browse Books", href: "/student/browse", active: false },
    { name: "Book Request", href: "/student/book-request", active: false },
    { name: "Issued Books", href: "/student/my-books", active: false },
    { name: "Invoices", href: "/student/invoices", active: true },
  ];
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[#2A4B4B] text-gray-300">
      <LibraryLogo />
      <nav className="flex flex-col text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`px-6 py-3 transition-colors ${item.active ? "bg-[#AEC7C7] font-bold text-black" : "hover:bg-gray-700"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default function InvoicesPage() {
  return (
    <AuthWrapper>
      <div className="flex h-screen bg-[#AEC7C7] font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <StudentHeader title="Invoices" />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="rounded-lg bg-[#EAE8E3] p-6 shadow-lg">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="p-4 font-semibold text-gray-700">#</th>
                    <th className="p-4 font-semibold text-gray-700">Book ID</th>
                    <th className="p-4 font-semibold text-gray-700">
                      Book Name
                    </th>
                    <th className="p-4 font-semibold text-gray-700">
                      Book Fee
                    </th>
                    <th className="p-4 font-semibold text-gray-700">Status</th>
                    <th className="p-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoicesData.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <td className="p-4 text-gray-800">{invoice.id}</td>
                      <td className="p-4 text-gray-800">{invoice.bookId}</td>
                      <td className="p-4 text-gray-800">{invoice.bookName}</td>
                      <td className="p-4 text-gray-800">{invoice.bookFee}</td>
                      <td
                        className={`p-4 font-semibold ${invoice.status === "Paid" ? "text-green-600" : "text-red-600"}`}
                      >
                        {invoice.status}
                      </td>
                      <td className="p-4 text-gray-800">
                        {invoice.status === "Paid" ? (
                          <span>Completed</span>
                        ) : (
                          <select className="rounded-lg border border-gray-400 bg-white px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#587878] focus:outline-none">
                            <option>Over-The-Counter</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </AuthWrapper>
  );
}
