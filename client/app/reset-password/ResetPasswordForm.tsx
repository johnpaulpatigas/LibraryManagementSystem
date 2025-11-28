// app/reset-password/ResetPasswordForm.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("No reset token found. Please request a new link.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Missing reset token.");
      return;
    }
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/reset-password",
        { token, password },
      );
      setMessage(response.data.message + " Redirecting to login...");
      setTimeout(() => {
        router.push("/");
      }, 3000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[rgb(50,70,70)]">
      <form
        onSubmit={handleSubmit}
        className="flex w-130 flex-col items-center space-y-4 rounded-3xl bg-[rgb(200,220,220)] p-10 px-15"
      >
        <h1 className="text-center text-3xl font-extrabold tracking-tight">
          Reset Your Password
        </h1>

        {message && <p className="pt-2 text-sm text-green-700">{message}</p>}
        {error && <p className="pt-2 text-sm text-red-600">{error}</p>}

        <div className="w-full space-y-4 pt-4">
          <div>
            <label htmlFor="password">New Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 bg-white"
              required
            />
          </div>
        </div>

        <Button
          className="mt-4 w-full cursor-pointer rounded-full bg-blue-700 px-10 text-lg hover:bg-blue-600"
          type="submit"
          disabled={isLoading || !token}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
