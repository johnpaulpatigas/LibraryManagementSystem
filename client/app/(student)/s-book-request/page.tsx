// app/(student)/book-request/page.tsx
"use client";
import StudentLayout from "@/components/StudentLayout";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getBookRequests,
  deleteBookRequest,
} from "@/lib/services/book_requests";
import BookRequestModal from "@/components/BookRequestModal";

const StatusBadge = ({
  status,
}: {
  status: "approved" | "pending" | "rejected";
}) => {
  const statusStyles = {
    approved: "bg-green-500 text-white",
    pending: "bg-orange-400 text-white",
    rejected: "bg-red-500 text-white",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

const BookRequestCard = ({ bookRequest, onDelete }: { bookRequest: any, onDelete: (id: number) => void }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-[#EAE8E3] p-4 shadow-lg">
      <h3 className="mt-1 text-lg font-bold text-gray-800">
        {bookRequest.book_title}
      </h3>
      <p className="mb-3 text-sm text-gray-600">{bookRequest.author_name}</p>
      <StatusBadge status={bookRequest.status} />
      <div className="mt-4">
        <button
          onClick={() => onDelete(bookRequest.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default function BookRequestPage() {
  const [bookRequests, setBookRequests] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookRequest, setSelectedBookRequest] = useState(null);

  const fetchBookRequests = async () => {
    try {
      const response = await getBookRequests();
      setBookRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch book requests:", error);
    }
  };

  useEffect(() => {
    fetchBookRequests();
  }, []);

  const handleCreateBookRequest = () => {
    setSelectedBookRequest(null);
    setIsModalOpen(true);
  };

  const handleDeleteBookRequest = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book request?")) {
      try {
        await deleteBookRequest(id);
        fetchBookRequests();
      } catch (error) {
        console.error("Failed to delete book request:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchBookRequests();
  };

  const statuses = [
    "all",
    ...new Set(bookRequests.map((request) => request.status)),
  ];
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredBookRequests = bookRequests.filter((request) => {
    return selectedStatus === "all" || request.status === selectedStatus;
  });

  return (
    <StudentLayout activePage="Book Request" headerTitle="Book Request">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">My Book Requests</h1>
        <button
          onClick={handleCreateBookRequest}
          className="flex items-center gap-2 rounded-md bg-[#587878] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#4a6666]"
        >
          <Plus className="h-5 w-5" />
          <span>Request Book</span>
        </button>
      </div>

      <div className="mb-8 flex items-center justify-start">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-1/4 rounded-lg border border-gray-400 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#587878] focus:outline-none"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookRequests.length > 0 ? (
          filteredBookRequests.map((request) => (
            <BookRequestCard
              key={request.id}
              bookRequest={request}
              onDelete={handleDeleteBookRequest}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No book requests found.
          </p>
        )}
      </div>
      <BookRequestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        bookRequest={selectedBookRequest}
        onFinished={handleModalClose}
      />
    </StudentLayout>
  );
}

