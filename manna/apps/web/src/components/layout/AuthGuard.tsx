"use client";
import React, { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 10_000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && !authenticated) router.replace("/login");
  }, [ready, authenticated, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d1321]">
        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl font-bold text-[#4ec99b] tracking-wide">manna</div>
          {timedOut ? (
            <>
              <p className="text-white/60 text-sm max-w-xs text-center">Unable to connect. Please refresh.</p>
              <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg bg-[#2d9f6f] text-white text-sm font-medium">Refresh</button>
            </>
          ) : (
            <div className="h-1 w-24 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full bg-[#2d9f6f] rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!authenticated) return null;
  return <>{children}</>;
}
