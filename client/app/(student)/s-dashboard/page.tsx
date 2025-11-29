// app/(student)/dashboard/page.tsx
"use client";
import StudentLayout from "@/components/StudentLayout";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/services/auth";
import { getBooks } from "@/lib/services/books";
import { getIssuedBooks } from "@/lib/services/issued_books";
import { getBookRequests } from "@/lib/services/book_requests";

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

const WelcomeBanner = ({ userName }: { userName: string }) => {
  return (
    <div className="rounded-lg bg-[#FDFBF6] p-4 shadow">
      <h1 className="text-2xl text-gray-800">Hey there! {userName}</h1>
    </div>
  );
};

export default function StudentDashboardPage() {
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({
    books: { total: 0, available: 0, inactive: 0 },
    issuedBooks: { ongoing: 0, returned: 0, overdue: 0 },
    bookRequests: { approved: 0, pending: 0, rejected: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileRes,
          booksRes,
          issuedBooksRes,
          bookRequestsRes,
        ] = await Promise.all([
          getProfile(),
          getBooks(),
          getIssuedBooks(),
          getBookRequests(),
        ]);

        setUserName(profileRes.data.fullname || "User");

        const books = booksRes.data;
        const issuedBooks = issuedBooksRes.data;
        const bookRequests = bookRequestsRes.data;

        setStats({
          books: {
            total: books.length,
            available: books.filter((b: any) => b.available_quantity > 0).length,
            inactive: books.filter((b: any) => b.available_quantity === 0).length,
          },
          issuedBooks: {
            ongoing: issuedBooks.filter((ib: any) => ib.status === "issued").length,
                        returned: issuedBooks.filter((ib: any) => ib.status === "returned").length,
                        overdue: issuedBooks.filter((ib: any) => ib.status === "overdue").length,
          },
          bookRequests: {
                        approved: bookRequests.filter((br: any) => br.status === "approved").length,
                                    pending: bookRequests.filter((br: any) => br.status === "pending").length,
                                    rejected: bookRequests.filter((br: any) => br.status === "rejected").length,
          },
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <StudentLayout activePage="Dashboard" headerTitle="Dashboard">
      <WelcomeBanner userName={userName} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <StatCard title="Books">
          <StatItem label="Total:" value={stats.books.total} color="orange" />
          <StatItem
            label="Available:"
            value={stats.books.available}
            color="green"
          />
          <StatItem
            label="Inactive:"
            value={stats.books.inactive}
            color="red"
          />
        </StatCard>

        <StatCard title="Issued-Books">
          <StatItem
            label="On-going:"
            value={stats.issuedBooks.ongoing}
            color="orange"
          />
          <StatItem
            label="Returned:"
            value={stats.issuedBooks.returned}
            color="green"
          />
          <StatItem
            label="Overdue:"
            value={stats.issuedBooks.overdue}
            color="red"
          />
        </StatCard>

        <StatCard title="Book Request">
          <StatItem
            label="Approved:"
            value={stats.bookRequests.approved}
            color="green"
          />
          <StatItem
            label="Pending:"
            value={stats.bookRequests.pending}
            color="orange"
          />
          <StatItem
            label="Rejected:"
            value={stats.bookRequests.rejected}
            color="red"
          />
        </StatCard>
      </div>
    </StudentLayout>
  );
}
