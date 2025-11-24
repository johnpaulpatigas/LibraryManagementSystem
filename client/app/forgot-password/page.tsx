// app/forgot-password/page.tsx
"use client";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/forgot-password",
        { email },
      );
      setMessage(response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard isPrivate={false}>
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(50,70,70)]">
        <form
          onSubmit={handleSubmit}
          className="flex w-130 flex-col items-center space-y-4 rounded-3xl bg-[rgb(200,220,220)] p-10 px-15"
        >
          <h1 className="text-center text-3xl font-extrabold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-muted-foreground text-center text-sm">
            Enter your email to receive a password reset link.
          </p>

          {message && <p className="pt-2 text-sm text-green-700">{message}</p>}
          {error && <p className="pt-2 text-sm text-red-600">{error}</p>}

          <div className="w-full pt-4">
            <label htmlFor="email" className="text-md font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-white"
              placeholder="you@example.com"
              required
            />
          </div>

          <Button
            className="mt-4 w-full cursor-pointer rounded-full bg-blue-700 px-10 text-lg hover:bg-blue-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          <Link className="text-sm text-green-700 hover:underline" href="/">
            Back to Login
          </Link>
        </form>
      </div>
    </AuthGuard>
  );
}
