"use client";

import { usePrivy } from "@privy-io/react-auth";
import { COMPANY_PROFILE } from "@/lib/mock-data";
import { Bell } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-4 pt-safe h-14">
      <div>
        <p className="text-xs text-gray-400 font-medium">Welcome back</p>
        <p className="text-sm font-bold text-[#0f1729]">{COMPANY_PROFILE.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
          <Bell size={17} className="text-gray-400" />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#0f1729] flex items-center justify-center text-white text-sm font-bold shadow-sm">
          {COMPANY_PROFILE.name[0]}
        </div>
      </div>
    </header>
  );
}
