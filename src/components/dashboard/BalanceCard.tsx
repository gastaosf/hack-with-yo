"use client";

import { useEurBalance } from "@/hooks/useEurBalance";
import { useYieldStats } from "@/hooks/useYieldStats";
import { formatEur, formatPercentage } from "@/lib/format";
import { TrendingUp } from "lucide-react";

export function BalanceCard() {
  const { balanceFloat, isLoading: balanceLoading } = useEurBalance();
  const { apyPercent, isLoading: yieldLoading } = useYieldStats();
  const isLoading = balanceLoading || yieldLoading;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0d1321] px-6 pt-6 pb-8 text-white shadow-xl mx-4 mt-4">
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#2d9f6f]/10" />

      <div className="relative">
        <p className="text-xs font-medium text-white/50 tracking-widest uppercase mb-3">
          Total Balance
        </p>

        {isLoading ? (
          <div>
            <div className="skeleton h-10 w-48 mb-1" style={{ background: "rgba(255,255,255,0.12)" }} />
            <div className="skeleton h-4 w-28 mt-3" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
        ) : (
          <div className="balance-animate">
            <div className="text-4xl font-bold tabular tracking-tight">
              {formatEur(balanceFloat)}
            </div>
            {apyPercent != null && balanceFloat > 0 && (
              <div className="flex items-center gap-1.5 mt-3">
                <TrendingUp size={13} className="text-[#2d9f6f]" />
                <span className="text-sm text-white/60">
                  Earning{" "}
                  <span className="text-[#2d9f6f] font-semibold">
                    {formatPercentage(apyPercent)}
                  </span>{" "}
                  annual return
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
