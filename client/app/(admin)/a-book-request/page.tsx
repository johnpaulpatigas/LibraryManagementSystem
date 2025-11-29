// app/(admin)/book-request/page.tsx
"use client";
import AdminLayout from "@/components/AdminLayout";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBookRequests, deleteBookRequest } from "@/lib/services/book_requests";
import BookRequestModal from "@/components/BookRequestModal"; // Import the modal

type BookRequest = {
  id: number;
  user_id: number;
  book_title: string;
  author_name: string;
  status: "pending" | "approved" | "rejected";
  borrower?: string;
  issuedId?: number;
  fees?: number;
  toReturn?: string;
  imageUrl?: string;
};

type Status = "approved" | "pending" | "rejected";

const StatusBadge = ({ status }: { status: Status }) => {
  const statusStyles = {
    approved: "bg-green-500 text-white",
    pending: "bg-orange-400 text-white",
    rejected: "bg-red-500 text-white",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function BookRequestAdminPage() {
  const [bookRequests, setBookRequests] = useState<BookRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookRequest, setSelectedBookRequest] = useState<BookRequest | null>(null);

  const fetchBookRequests = async () => {
    try {
      setLoading(true);
      const response = await getBookRequests();
      const formattedRequests: BookRequest[] = response.data.map((req: any) => ({
        id: req.id,
        user_id: req.user_id,
        book_title: req.book_title,
        author_name: req.author_name,
        status: req.status,
        borrower: "N/A", // Placeholder, will need to fetch user info
        issuedId: req.id, // Using request ID as issued ID for now
        fees: 0,
        toReturn: "N/A",
        imageUrl: "/file.svg",
      }));
      setBookRequests(formattedRequests);
    } catch (err: any) {
      setError(err.message || "Failed to fetch book requests.");
      console.error("Failed to fetch book requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookRequests();
  }, []);

  const handleEdit = (request: BookRequest) => {
    setSelectedBookRequest(request);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book request?")) {
      try {
        await deleteBookRequest(id);
        fetchBookRequests(); // Refresh the list
      } catch (err: any) {
        alert("Failed to delete book request: " + (err.message || "Unknown error"));
        console.error("Failed to delete book request:", err);
      }
    }
  };

  const handleModalClose = () => {
    setSelectedBookRequest(null);
    setIsModalOpen(false);
  };

  const handleFormFinished = () => {
    handleModalClose();
    fetchBookRequests(); // Refresh the list after form submission
  };

  if (loading) {
    return (
      <AdminLayout activePage="Book Request">
        <div className="text-center text-gray-600">Loading book requests...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activePage="Book Request">
        <div className="text-center text-red-600">Error: {error}</div>
      </AdminLayout>
    );
  }

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
              <th className="p-4 font-semibold">Book Title</th>
              <th className="p-4 font-semibold">Author Name</th>
              <th className="p-4 font-semibold">Fees</th>
              <th className="p-4 font-semibold">To Return</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookRequests.map((req) => (
              <tr
                key={req.id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4 text-gray-800">{req.id}</td>
                <td className="p-4">
                  <Image
                    src={req.imageUrl || "/file.svg"}
                    alt={req.book_title}
                    width={40}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </td>
                <td className="p-4 text-gray-800">{req.issuedId}</td>
                <td className="p-4 text-gray-600">{req.borrower}</td>
                <td className="p-4 font-medium text-gray-800">
                  {req.book_title}
                </td>
                <td className="p-4 text-gray-600">{req.author_name}</td>
                <td className="p-4 text-gray-600">{req.fees}</td>
                <td className="p-4 text-gray-600">{req.toReturn}</td>
                <td className="p-4">
                  <StatusBadge status={req.status as Status} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(req)}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(req.id)}
                      className="text-gray-500 hover:text-red-600"
                    >
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

      <BookRequestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        bookRequest={selectedBookRequest}
        onFinished={handleFormFinished}
      />
    </AdminLayout>
  );
}