// components/AuthGuard.tsx
"use client";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  isPrivate: boolean;
  role?: "admin" | "user";
}

export default function AuthGuard({
  children,
  isPrivate,
  role,
}: AuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (!token || !storedUser) {
      if (isPrivate) {
        router.push("/");
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAuthorized(true);
      }
      setIsLoading(false);
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      const userRole = user.role;

      if (isPrivate) {
        if (role && userRole === role) {
          setIsAuthorized(true);
        } else {
          const dashboardUrl =
            userRole === "admin" ? "/a-dashboard" : "/s-dashboard";
          router.push(dashboardUrl);
        }
      } else {
        const dashboardUrl =
          userRole === "admin" ? "/a-dashboard" : "/s-dashboard";
        router.push(dashboardUrl);
      }
    } catch {
      localStorage.clear();
      sessionStorage.clear();
      if (isPrivate) {
        router.push("/");
      } else {
        setIsAuthorized(true);
      }
    }
    setIsLoading(false);
  }, [router, isPrivate, role]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(50,70,70)]">
        <div className="flex flex-col items-center gap-4 text-white">
          <CircleUserRound className="h-16 w-16 animate-pulse" />
          <p>Verifying Access...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
