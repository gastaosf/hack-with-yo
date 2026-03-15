"use client";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { COMPANY_PROFILE } from "@manna/shared";

export function DashboardHeader() {
  const router = useRouter();
  const { user } = usePrivy();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="flex items-center justify-between px-5 py-4">
      <div>
        <div className="text-[17px] font-semibold text-[#0d1321]">
          {greeting}, {COMPANY_PROFILE.name}
        </div>
        <div className="text-[13px] text-[#9ca3af] mt-0.5">{dateStr}</div>
      </div>
      <button
        onClick={() => router.push("/settings")}
        className="w-10 h-10 rounded-full bg-[#f4f4ef] flex items-center justify-center hover:bg-[#e8e8e0] transition-colors"
        aria-label="Settings"
      >
        <Settings size={20} className="text-[#4b5563]" />
      </button>
    </header>
  );
}
