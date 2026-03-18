"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Bell, RotateCw } from "lucide-react";

export function DashboardHeader() {
  const { profile } = useCompanyProfile();
  const queryClient = useQueryClient();
  const [spinning, setSpinning] = useState(false);
  const displayName = profile?.name ?? "Your Company";

  const handleRefresh = () => {
    setSpinning(true);
    queryClient.invalidateQueries();
    setTimeout(() => setSpinning(false), 1000);
  };

  return (
    <header className="flex items-center justify-between px-4 pt-safe h-14">
      <div>
        <p className="text-xs text-gray-400 font-medium">Welcome back</p>
        <p className="text-sm font-bold text-[#0d1321]">{displayName}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleRefresh}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        >
          <RotateCw
            size={17}
            className={`text-gray-400 transition-transform ${spinning ? "animate-spin" : ""}`}
          />
        </button>
        <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
          <Bell size={17} className="text-gray-400" />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#0d1321] flex items-center justify-center text-white text-sm font-bold shadow-sm">
          {displayName[0]}
        </div>
      </div>
    </header>
  );
}
