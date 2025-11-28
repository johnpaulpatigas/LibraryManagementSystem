// app/(admin)/book-request/page.tsx
"use client";
import AdminLayout from "@/components/AdminLayout";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

const requestData = [
  {
    id: 1,
    issuedId: 1,
    borrower: "John Doe",
    bookName: "A Midsummer Night's Dream",
    fees: 10,
    toReturn: "26/11/2025",
    status: "Approved",
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1606142232l/11139.jpg",
  },
  {
    id: 2,
    issuedId: 2,
    borrower: "John Doe",
    bookName: "Call me by Your Name",
    fees: 10,
    toReturn: "26/11/2025",
    status: "Approved",
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490216556l/34884922.jpg",
  },
  {
    id: 3,
    issuedId: 3,
    borrower: "John Doe",
    bookName: "Paradise Lost",
    fees: 10,
    toReturn: "26/11/2025",
    status: "Approved",
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657613854l/15998.jpg",
  },
  {
    id: 4,
    issuedId: 4,
    borrower: "John Doe",
    bookName: "5 Feet Apart",
    fees: 10,
    toReturn: "26/11/2025",
    status: "Pending",
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522223067l/39939417.jpg",
  },
  {
    id: 5,
    issuedId: 5,
    borrower: "John Doe",
    bookName: "Call me by Your Name",
    fees: 10,
    toReturn: "26/11/2025",
    status: "Pending",
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490216556l/34884922.jpg",
  },
  {
    id: 6,
    issuedId: 6,
    borrower: "John Doe",
    bookName: "Young Hearts",
    fees: 10,
    toReturn: "26/11/2025",
    status: "Rejected",
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1685878393l/150244831.jpg",
  },
  {
    id: 7,
    issuedId: 7,
    borrower: "John Doe",
    bookName: "Paradise Lost",
    fees: 10,
    toReturn: "26/11/2025",
    status: "Rejected",
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657613854l/15998.jpg",
  },
];

type Status = "Approved" | "Pending" | "Rejected";

const StatusBadge = ({ status }: { status: Status }) => {
  const statusStyles = {
    Approved: "bg-green-500 text-white",
    Pending: "bg-orange-400 text-white",
    Rejected: "bg-red-500 text-white",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default function BookRequestAdminPage() {
  return (
    <AdminLayout activePage="Book Request">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Book Request</h1>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Show</span>
          <select className="rounded-md border border-gray-300 bg-white px-2 py-1 focus:ring-2 focus:ring-[#587878] focus:outline-none">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
          <span>entries</span>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-64 rounded-md border border-gray-300 bg-white px-3 py-1.5 focus:ring-2 focus:ring-[#587878] focus:outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="w-full text-left">
          <thead className="bg-[#7A9999] text-white">
            <tr>
              <th className="p-4 font-semibold">No.</th>
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Issued #</th>
              <th className="p-4 font-semibold">Borrower</th>
              <th className="p-4 font-semibold">Book Name</th>
              <th className="p-4 font-semibold">Fees</th>
              <th className="p-4 font-semibold">To Return</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestData.map((req) => (
              <tr
                key={req.id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4 text-gray-800">{req.id}</td>
                <td className="p-4">
                  <Image
                    src={req.imageUrl}
                    alt={req.bookName}
                    width={40}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </td>
                <td className="p-4 text-gray-800">{req.issuedId}</td>
                <td className="p-4 text-gray-600">{req.borrower}</td>
                <td className="p-4 font-medium text-gray-800">
                  {req.bookName}
                </td>
                <td className="p-4 text-gray-600">{req.fees}</td>
                <td className="p-4 text-gray-600">{req.toReturn}</td>
                <td className="p-4">
                  <StatusBadge status={req.status as Status} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {req.status !== "Approved" && (
                      <button className="text-gray-500 hover:text-blue-600">
                        <Pencil className="h-5 w-5" />
                      </button>
                    )}
                    <button className="text-gray-500 hover:text-red-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end text-sm text-gray-700">
        <button className="rounded-md px-3 py-1 hover:bg-gray-200">
          Previous
        </button>
        <span className="mx-2 rounded-md bg-[#587878] px-3 py-1 text-white">
          1
        </span>
        <button className="rounded-md px-3 py-1 hover:bg-gray-200">Next</button>
      </div>
    </AdminLayout>
  );
}
