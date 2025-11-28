// app/(admin)/a-dashboard/page.tsx
"use client";
import AdminLayout from "@/components/AdminLayout";
import { getBooks } from "@/lib/services/books";
import { getUsers } from "@/lib/services/users";
import { getAuthors } from "@/lib/services/authors";
import { getCategories } from "@/lib/services/categories";
import { useEffect, useState } from "react";

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="p-6 text-gray-800">
    <p className="text-sm text-gray-600">{title}</p>
    <p className="mt-1 text-4xl font-bold">{value}</p>
  </div>
);

export default function ReworkedAdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    books: 0,
    authors: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, booksRes, authorsRes, categoriesRes] = await Promise.all([
          getUsers(),
          getBooks(),
          getAuthors(),
          getCategories(),
        ]);
        setStats({
          users: usersRes.data.length,
          books: booksRes.data.length,
          authors: authorsRes.data.length,
          categories: categoriesRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout activePage="Dashboard">
      <div className="grid grid-cols-1 divide-x-2 divide-gray-300/50 rounded-lg bg-gray-200/70 shadow-md md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={stats.users} />
        <StatCard title="Total Books" value={stats.books} />
        <StatCard title="Total Authors" value={stats.authors} />
        <StatCard title="Total Categories" value={stats.categories} />
      </div>
    </AdminLayout>
  );
}
