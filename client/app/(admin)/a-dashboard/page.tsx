// app/(admin)/a-dashboard/page.tsx
"use client";
import AdminLayout from "@/components/AdminLayout";

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
  return (
    <AdminLayout activePage="Dashboard">
      <div className="grid grid-cols-1 divide-x-2 divide-gray-300/50 rounded-lg bg-gray-200/70 shadow-md md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total User" value={3} />
        <StatCard title="Total Available Books" value={10} />
        <StatCard title="Active Book Request" value={0} />
        <StatCard title="Total Sales" value={110} />
      </div>
    </AdminLayout>
  );
}
