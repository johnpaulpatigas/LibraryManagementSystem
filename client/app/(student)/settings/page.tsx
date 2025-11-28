// app/(student)/settings/page.tsx
"use client";
import StudentLayout from "@/components/StudentLayout";
import { useState } from "react";

const SettingsCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg bg-[#EAE8E3] p-8 shadow-md">
    <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving profile:", { name, email });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating password...");
  };

  return (
    <StudentLayout activePage="Settings" headerTitle="Settings">
      <SettingsCard title="Profile Information">
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="rounded-md bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </SettingsCard>

      <SettingsCard title="Update Password">
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="rounded-md bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </SettingsCard>
    </StudentLayout>
  );
}
