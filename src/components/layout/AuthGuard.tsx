"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 10_000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && !authenticated) {
      router.replace("/login");
    }
  }, [ready, authenticated, router]);

  if (!ready) {
    if (timedOut) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0d1321]">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <div className="text-2xl font-bold text-white tracking-wide">manna</div>
            <p className="text-white/60 text-sm max-w-xs">
              Unable to connect. Please check your internet connection and refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 rounded-lg bg-[#2d9f6f] text-white text-sm font-medium hover:bg-[#4ec99b] transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d1321]">
        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl font-bold text-white tracking-wide">manna</div>
          <div className="h-1 w-24 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-[#2d9f6f] rounded-full animate-pulse" style={{ width: "60%" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return <>{children}</>;
}
