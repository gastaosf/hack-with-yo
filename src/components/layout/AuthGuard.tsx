"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.replace("/login");
    }
  }, [ready, authenticated, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1729]">
        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl font-bold text-white tracking-wide">manna</div>
          <div className="h-1 w-24 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-[#c9a84c] rounded-full animate-pulse" style={{ width: "60%" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return <>{children}</>;
}
