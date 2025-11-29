"use client";
import AdminLayout from "@/components/AdminLayout";
import { Check } from "lucide-react"; // Using Check icon for "Mark as Paid"
import { useEffect, useState } from "react";
import { getTransactions, updateTransaction } from "@/lib/services/transactions";

type Transaction = {
  id: number;
  user_id: number;
  user_name: string; // From join
  issued_book_id: number;
  book_name: string; // From join
  type: string;
  amount: number;
  description: string;
  status: 'paid' | 'unpaid'; // Assuming backend uses lowercase
  created_at: string;
};

type DisplayStatus = "Paid" | "Unpaid";

const getDisplayStatus = (status: Transaction['status']): DisplayStatus => {
  if (status === 'paid') return 'Paid';
  if (status === 'unpaid') return 'Unpaid';
  return 'Unpaid'; // Default
};

const StatusBadge = ({ status }: { status: DisplayStatus }) => {
  const statusStyles = {
    Paid: "bg-green-500 text-white",
    Unpaid: "bg-red-500 text-white",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch transactions.");
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleMarkAsPaid = async (transaction: Transaction) => {
    if (transaction.status === 'unpaid' && window.confirm("Are you sure you want to mark this transaction as paid?")) {
      try {
        // Need to send all required fields for update, even if only status is changing
        // Assuming user_id, issued_book_id, type, amount, description are necessary and available in the transaction object
        await updateTransaction(transaction.id, {
          user_id: transaction.user_id,
          issued_book_id: transaction.issued_book_id,
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          status: 'paid',
        });
        fetchTransactions(); // Refresh the list
      } catch (err: any) {
        alert("Failed to mark transaction as paid: " + (err.message || "Unknown error"));
        console.error("Failed to mark transaction as paid:", err);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout activePage="Transactions">
        <div className="text-center text-gray-600">Loading transactions...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activePage="Transactions">
        <div className="text-center text-red-600">Error: {error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="Transactions">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
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
              <th className="p-4 font-semibold">User Name</th>
              <th className="p-4 font-semibold">Book Name</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4 text-gray-800">{tx.id}</td>
                <td className="p-4 text-gray-600">{tx.user_name}</td>
                <td className="p-4 font-medium text-gray-800">
                  {tx.book_name}
                </td>
                <td className="p-4 text-gray-600">{tx.type}</td>
                <td className="p-4 text-gray-600">{tx.amount}</td>
                <td className="p-4">
                  <StatusBadge status={getDisplayStatus(tx.status)} />
                </td>
                <td className="p-4">
                  {tx.status === "paid" ? (
                    <span className="text-gray-500">Completed</span>
                  ) : (
                    <button
                      onClick={() => handleMarkAsPaid(tx)}
                      className="text-gray-500 hover:text-blue-600"
                      title="Mark as Paid"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  )}
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
        <button className="rounded-md px-3 py-1 hover:bg-gray-200">
          Next
        </button>
      </div>
    </AdminLayout>
  );
}