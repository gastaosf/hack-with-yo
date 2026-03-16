"use client";
import { useYieldStats, useEurBalance, formatEur } from "@manna/shared";

export function YieldSummary() {
  const { apyPercent, yieldEarnedFloat, isLoading } = useYieldStats();
  const { balanceFloat } = useEurBalance();

  const projectedMonthly = apyPercent
    ? (balanceFloat * apyPercent) / 100 / 12
    : 0;

  return (
    <div className="mx-4 mt-5 bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] p-5">
      <h3 className="text-[15px] font-semibold text-[#0d1321] mb-4">
        Returns Summary
      </h3>
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="text-[12px] text-[#9ca3af] mb-1">Last 30 days</div>
          <div className="text-[22px] font-bold text-[#2d9f6f] tabular-nums">
            {isLoading ? "—" : `+${formatEur(yieldEarnedFloat)}`}
          </div>
        </div>
        <div className="w-px bg-[#f0f0ea]" />
        <div className="flex-1">
          <div className="text-[12px] text-[#9ca3af] mb-1">Next 12 months</div>
          <div className="text-[22px] font-bold text-[#0d1321] tabular-nums">
            {isLoading ? "—" : formatEur(projectedMonthly * 12)}
          </div>
        </div>
      </div>

      {/* Simple bar chart */}
      <div
        className="mt-4 flex items-end gap-1 h-8"
        role="img"
        aria-label="Daily returns trend"
      >
        {[65, 72, 68, 80, 75, 88, 85].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-[#4ec99b]"
            style={{ height: `${h}%`, opacity: 0.6 + (i / 7) * 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}
