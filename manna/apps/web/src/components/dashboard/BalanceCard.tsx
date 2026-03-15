"use client";
import { useEurBalance, useYieldStats, formatEur, formatEurCompact } from "@manna/shared";

export function BalanceCard() {
  const { balanceFloat, isLoading: balanceLoading } = useEurBalance();
  const { apyPercent, yieldEarnedFloat, isLoading: yieldLoading } = useYieldStats();

  const isLoading = balanceLoading || yieldLoading;
  const projected = apyPercent ? (balanceFloat * apyPercent) / 100 : 0;

  return (
    <div
      className="mx-4 rounded-[28px] shadow-xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d1321 0%, #1a2f4a 60%, #1e3d3d 100%)",
      }}
    >
      <div className="p-7">
        {/* Top row */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[13px] font-normal tracking-[0.04em] text-white/60 uppercase">
            Treasury Balance
          </span>
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-[10px] text-white/40 font-bold">M</span>
          </div>
        </div>

        {/* Balance */}
        {isLoading ? (
          <div
            className="h-10 w-48 mb-3 rounded-md"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.05) 75%)",
              backgroundSize: "200% 100%",
              animation: "skeleton-shimmer 1.4s ease infinite",
            }}
          />
        ) : (
          <div className="text-[38px] font-bold text-white tabular-nums tracking-tight leading-none">
            {formatEur(balanceFloat)}
          </div>
        )}

        {/* Annual return badge */}
        <div
          className="mt-3 inline-flex items-center rounded-full px-3 py-1.5 text-[13px] font-semibold text-[#4ec99b]"
          style={{ background: "rgba(45,159,111,0.25)" }}
        >
          {apyPercent ? `${apyPercent.toFixed(1)}%` : "—"} Annual Return
        </div>

        {/* Divider */}
        <div className="mt-6 mb-4 border-t border-white/10" />

        {/* Stats row */}
        <div className="flex justify-between">
          <div>
            <div className="text-[12px] text-white/50 mb-1">Earnings this month</div>
            <div className="text-[18px] font-semibold text-[#4ec99b] tabular-nums">
              {isLoading ? "—" : formatEur(yieldEarnedFloat)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[12px] text-white/50 mb-1">Projected annual</div>
            <div className="text-[18px] font-semibold text-[#4ec99b] tabular-nums">
              {isLoading ? "—" : formatEurCompact(projected)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
