// app/(student)/dashboard/page.tsx
"use client";
import StudentLayout from "@/components/StudentLayout";
import { useEffect, useState } from "react";

type StatItemProps = {
  label: string;
  value: number;
  color: "orange" | "green" | "red";
};

const StatItem = ({ label, value, color }: StatItemProps) => {
  const colorClasses = {
    orange: "text-orange-500",
    green: "text-green-600",
    red: "text-red-600",
  };
  return (
    <div className="flex justify-between">
      <span className={colorClasses[color]}>{label}</span>
      <span className={`font-bold ${colorClasses[color]}`}>{value}</span>
    </div>
  );
};

const StatCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg bg-[#FDFBF6] p-6 shadow-md">
    <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
    <div className="text-md space-y-2">{children}</div>
  </div>
);

const WelcomeBanner = () => {
  const [userName, setUserName] = useState("User");
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserName(JSON.parse(storedUser).fullname || "User");
    }
  }, []);

  return (
    <div className="rounded-lg bg-[#FDFBF6] p-4 shadow">
      <h1 className="text-2xl text-gray-800">Hey there! {userName}</h1>
    </div>
  );
};

export default function StudentDashboardPage() {
  return (
    <StudentLayout activePage="Dashboard" headerTitle="Dashboard">
      <WelcomeBanner />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <StatCard title="Books">
          <StatItem label="Total:" value={0} color="orange" />
          <StatItem label="Available:" value={0} color="green" />
          <StatItem label="Inactive:" value={0} color="red" />
        </StatCard>

        <StatCard title="Issued-Books">
          <StatItem label="On-going:" value={0} color="orange" />
          <StatItem label="Returned:" value={0} color="green" />
          <StatItem label="Overdue:" value={0} color="red" />
        </StatCard>

        <StatCard title="Book Request">
          <StatItem label="Approved:" value={0} color="green" />
          <StatItem label="Pending:" value={0} color="orange" />
          <StatItem label="Rejected:" value={0} color="red" />
        </StatCard>

        <StatCard title="Invoice">
          <StatItem label="Over-the-counter:" value={0} color="orange" />
          <StatItem label="Paid:" value={0} color="green" />
          <StatItem label="Unpaid:" value={0} color="red" />
        </StatCard>
      </div>
    </StudentLayout>
  );
}
