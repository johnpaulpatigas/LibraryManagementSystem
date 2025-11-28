// app/reset-password/page.tsx
"use client";
import AuthGuard from "@/components/AuthGuard";
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthGuard isPrivate={false}>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthGuard>
  );
}
