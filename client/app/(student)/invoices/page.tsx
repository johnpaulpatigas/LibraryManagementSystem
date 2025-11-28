// app/(student)/invoices/page.tsx
"use client";
import StudentLayout from "@/components/StudentLayout";

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

export default function InvoicesPage() {
  return (
    <StudentLayout activePage="Invoices" headerTitle="Invoices">
      <div className="rounded-lg bg-[#EAE8E3] p-6 shadow-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="p-4 font-semibold text-gray-700">#</th>
              <th className="p-4 font-semibold text-gray-700">Book ID</th>
              <th className="p-4 font-semibold text-gray-700">Book Name</th>
              <th className="p-4 font-semibold text-gray-700">Book Fee</th>
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
                  className={`p-4 font-semibold ${
                    invoice.status === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
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
    </StudentLayout>
  );
}

