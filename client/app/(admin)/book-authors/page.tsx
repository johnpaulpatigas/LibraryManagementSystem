// app/admin)/book-authors/page.tsx
"use client";
import AdminLayout from "@/components/AdminLayout";
import AuthorModal from "@/components/AuthorModal";
import { deleteAuthor, getAuthors } from "@/lib/services/authors";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookAuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors();
      setAuthors(response.data);
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleAddAuthor = () => {
    setSelectedAuthor(null);
    setIsModalOpen(true);
  };

  const handleEditAuthor = (author: any) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  };

  const handleDeleteAuthor = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      try {
        await deleteAuthor(id);
        fetchAuthors();
      } catch (error) {
        console.error("Failed to delete author:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchAuthors();
  };

  return (
    <AdminLayout activePage="Book Authors">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Book Author</h1>
        <button
          onClick={handleAddAuthor}
          className="flex items-center gap-2 rounded-md bg-[#587878] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#4a6666]"
        >
          <Plus className="h-5 w-5" />
          <span>Add Author</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="w-full text-left">
          <thead className="bg-[#7A9999] text-white">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Created Date</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr
                key={author.id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-gray-800">{author.name}</td>
                <td className="p-4 text-gray-600">
                  {new Date(author.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditAuthor(author)}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAuthor(author.id)}
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
      <AuthorModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        author={selectedAuthor}
        onFinished={handleModalClose}
      />
    </AdminLayout>
  );
}
