// app/(student)/invoices/page.tsx
"use client";
import StudentLayout from "@/components/StudentLayout";
import { useEffect, useState } from "react";
import { getInvoices, updateInvoice } from "@/lib/services/invoices";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);

  const fetchInvoices = async () => {
    try {
      const response = await getInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handlePayInvoice = async (invoiceId: number) => {
    if (window.confirm("Are you sure you want to mark this invoice as paid?")) {
      try {
        await updateInvoice(invoiceId, { status: "paid" });
        fetchInvoices(); // Refresh the list
      } catch (error) {
        console.error("Failed to pay invoice:", error);
      }
    }
  };

  return (
    <StudentLayout activePage="Invoices" headerTitle="Invoices">
      <div className="rounded-lg bg-[#EAE8E3] p-6 shadow-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="p-4 font-semibold text-gray-700">#</th>
              <th className="p-4 font-semibold text-gray-700">Amount</th>
              <th className="p-4 font-semibold text-gray-700">Due Date</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <td className="p-4 text-gray-800">{invoice.id}</td>
                <td className="p-4 text-gray-800">${invoice.amount}</td>
                <td className="p-4 text-gray-800">
                  {new Date(invoice.due_date).toLocaleDateString()}
                </td>
                <td
                  className={`p-4 font-semibold ${
                    invoice.status === "paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </td>
                <td className="p-4 text-gray-800">
                  {invoice.status === "paid" ? (
                    <span>Completed</span>
                  ) : (
                    <button
                      onClick={() => handlePayInvoice(invoice.id)}
                      className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StudentLayout>
  );
}

