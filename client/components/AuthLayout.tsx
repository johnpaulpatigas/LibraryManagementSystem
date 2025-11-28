// components/AuthLayout.tsx
"use client";
import AuthGuard from "@/components/AuthGuard";
import Image from "next/image";

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <AuthGuard isPrivate={false}>
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(50,70,70)]">
        <div className="flex w-130 flex-col items-center space-y-3 rounded-3xl bg-[rgb(200,220,220)] p-10 px-15">
          <div className="mb-10 flex flex-col items-center">
            <Image
              className="mb-3"
              src="/globe.svg"
              alt="logo"
              width={60}
              height={60}
            />
            <h1 className="text-center text-3xl font-extrabold tracking-tight">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
