"use client";

import { useYieldStats } from "@/hooks/useYieldStats";
import { formatEur, formatPercentage } from "@/lib/format";

export function YieldSummary() {
  const { apyPercent, yieldEarnedFloat, isLoading } = useYieldStats();

  return (
    <div className="grid grid-cols-2 gap-3 mx-4 mt-3">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">
          Annual Return
        </p>
        {isLoading ? (
          <div className="skeleton h-6 w-16" />
        ) : (
          <p className="text-xl font-bold text-[#0d1321] tabular">
            {apyPercent != null ? formatPercentage(apyPercent) : "—"}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">Automatically compounding</p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">
          Interest Earned
        </p>
        {isLoading ? (
          <div className="skeleton h-6 w-20" />
        ) : (
          <p className="text-xl font-bold text-[#0d1321] tabular">
            {formatEur(yieldEarnedFloat)}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">Since first deposit</p>
      </div>
    </div>
  );
}
