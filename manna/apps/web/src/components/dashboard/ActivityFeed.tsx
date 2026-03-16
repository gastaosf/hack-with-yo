"use client";
import Link from "next/link";
import { useTransactionHistory, formatEur } from "@manna/shared";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export function ActivityFeed() {
  const { items, isLoading } = useTransactionHistory();
  const recent = items.slice(0, 4);

  return (
    <div className="mx-4 mt-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-semibold text-[#0d1321]">
          Recent Activity
        </h3>
        <Link
          href="/transfers"
          className="text-[13px] text-[#2d9f6f] hover:text-[#1f7a52]"
        >
          View all
        </Link>
      </div>

      <div className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] overflow-hidden">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 border-b border-[#f0f0ea] last:border-0"
              >
                <div className="skeleton w-10 h-10 rounded-[10px]" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3.5 w-32" />
                  <div className="skeleton h-3 w-20" />
                </div>
                <div className="skeleton h-4 w-16" />
              </div>
            ))
        ) : recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <ArrowDownToLine size={32} className="text-[#9ca3af] mb-3" />
            <p className="text-[16px] font-semibold text-[#0d1321]">
              No activity yet
            </p>
            <p className="text-[14px] text-[#9ca3af] mt-1">
              Add funds to start earning
            </p>
          </div>
        ) : (
          recent.map((item, i) => {
            const isDeposit = item.type === "deposit";
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-4 hover:bg-[#f4f4ef] transition-colors ${
                  i < recent.length - 1 ? "border-b border-[#f0f0ea]" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 ${
                    isDeposit ? "bg-[#e8f5ef]" : "bg-[#f4f4ef]"
                  }`}
                >
                  {isDeposit ? (
                    <ArrowDownToLine size={18} className="text-[#2d9f6f]" />
                  ) : (
                    <ArrowUpFromLine size={18} className="text-[#4b5563]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-medium text-[#0d1321] truncate">
                    {item.label}
                  </div>
                  <div className="text-[13px] text-[#9ca3af]">
                    {item.date.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
                <div
                  className={`text-[15px] font-semibold tabular-nums ${
                    item.amountFloat > 0 ? "text-[#2d9f6f]" : "text-[#0d1321]"
                  }`}
                >
                  {item.amountFloat > 0 ? "+" : ""}
                  {formatEur(Math.abs(item.amountFloat))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
