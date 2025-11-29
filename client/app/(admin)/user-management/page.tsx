// app/(admin)/user-management/page.tsx
"use client";
import AdminLayout from "@/components/AdminLayout";
import UserModal from "@/components/UserModal";
import { deleteUser, getUsers } from "@/lib/services/users";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchUsers();
  };

  return (
    <AdminLayout activePage="User Management">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 rounded-md bg-[#587878] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#4a6666]"
        >
          <Plus className="h-5 w-5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="w-full text-left">
          <thead className="bg-[#7A9999] text-white">
            <tr>
              <th className="p-4 font-semibold">Full Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Created Date</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-gray-800">
                  {user.fullname}
                </td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4 text-gray-600">{user.role}</td>
                <td className="p-4 text-gray-600">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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
      <UserModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        user={selectedUser}
        onFinished={handleModalClose}
      />
    </AdminLayout>
  );
}
