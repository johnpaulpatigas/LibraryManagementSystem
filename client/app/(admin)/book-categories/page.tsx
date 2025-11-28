// app/(admin)/book-categories/page.tsx
"use client";
import AdminLayout from "@/components/AdminLayout";
import { Pencil, Plus, Trash2 } from "lucide-react";

const categoriesData = [
  { id: 1, name: "Drama", created: "23/11/2025", updated: "23/11/2025" },
  { id: 2, name: "Classic", created: "21/11/2025", updated: "23/11/2025" },
  { id: 3, name: "Poetry", created: "19/11/2025", updated: "23/11/2025" },
  { id: 4, name: "Plays", created: "07/11/2025", updated: "23/11/2025" },
  { id: 5, name: "Fiction", created: "23/11/2025", updated: "23/11/2025" },
  { id: 6, name: "Christian", created: "23/11/2025", updated: "23/11/2025" },
];

export default function BookCategoriesPage() {
  return (
    <AdminLayout activePage="Book Categories">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Book Categories</h1>
        <button className="flex items-center gap-2 rounded-md bg-[#587878] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#4a6666]">
          <Plus className="h-5 w-5" />
          <span>Add Category</span>
        </button>
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
              <th className="p-4 font-semibold">Category Name</th>
              <th className="p-4 font-semibold">Created Date</th>
              <th className="p-4 font-semibold">Updated Date</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoriesData.map((category) => (
              <tr
                key={category.id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4 text-gray-800">{category.id}</td>
                <td className="p-4 font-medium text-gray-800">
                  {category.name}
                </td>
                <td className="p-4 text-gray-600">{category.created}</td>
                <td className="p-4 text-gray-600">{category.updated}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-500 hover:text-blue-600">
                      <Pencil className="h-5 w-5" />
                    </button>
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
