// components/AuthWrapper.tsx
"use client";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(50,70,70)]">
        <div className="flex flex-col items-center gap-4 text-white">
          <CircleUserRound className="h-16 w-16 animate-pulse" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
