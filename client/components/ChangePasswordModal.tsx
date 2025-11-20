"use client";
import { Settings } from "lucide-react";

interface ChangePasswordModalProps {
  onClose: () => void;
}

export default function ChangePasswordModal({
  onClose,
}: ChangePasswordModalProps) {
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password change form submitted");
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={handleModalContentClick}
        className="w-full max-w-lg rounded-2xl bg-[#c8dcdc] p-8 shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-slate-300 p-2">
            <Settings className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Change Password</h2>
        </div>
        <hr className="my-6 border-slate-400" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="currentPassword"
              className="font-medium whitespace-nowrap text-slate-700"
            >
              Enter Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Enter Current Password"
              className="w-64 rounded-lg border border-blue-400 bg-white p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="newPassword"
              className="font-medium whitespace-nowrap text-slate-700"
            >
              Enter New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter New Password"
              className="w-64 rounded-lg border border-blue-400 bg-white p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="confirmNewPassword"
              className="font-medium whitespace-nowrap text-slate-700"
            >
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
              className="w-64 rounded-lg border border-blue-400 bg-white p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-300 px-8 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-8 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
