import React from "react";
import { CARD_TRANSACTIONS } from "@manna/shared";
import { ShoppingBag, Cloud, Briefcase, Plane, Monitor } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Cloud: <Cloud size={18} className="text-[#3b82f6]" />,
  Office: <Briefcase size={18} className="text-[#9ca3af]" />,
  Software: <Monitor size={18} className="text-[#8b5cf6]" />,
  Travel: <Plane size={18} className="text-[#f59e0b]" />,
  HR: <Briefcase size={18} className="text-[#9ca3af]" />,
};

const CATEGORY_BG: Record<string, string> = {
  Cloud: "bg-[#eff6ff]",
  Office: "bg-[#f4f4ef]",
  Software: "bg-[#f5f3ff]",
  Travel: "bg-[#fffbeb]",
  HR: "bg-[#f4f4ef]",
};

export function CardTransactions() {
  return (
    <div className="mx-4 mt-6 mb-4">
      <h3 className="text-[15px] font-semibold text-[#0d1321] mb-3">
        Card Transactions
      </h3>
      <div className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] overflow-hidden">
        {CARD_TRANSACTIONS.map((tx, i) => (
          <div
            key={tx.id}
            className={`flex items-center gap-3 p-4 hover:bg-[#f4f4ef] transition-colors ${
              i < CARD_TRANSACTIONS.length - 1 ? "border-b border-[#f0f0ea]" : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 ${
                CATEGORY_BG[tx.category] ?? "bg-[#f4f4ef]"
              }`}
            >
              {CATEGORY_ICONS[tx.category] ?? (
                <ShoppingBag size={18} className="text-[#9ca3af]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-medium text-[#0d1321] truncate">
                {tx.merchant}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#9ca3af]">
                  {new Date(tx.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <span className="text-[11px] font-medium text-[#4b5563] bg-[#f4f4ef] px-2 py-0.5 rounded-full">
                  {tx.category}
                </span>
              </div>
            </div>
            <div className="text-[15px] font-semibold text-[#0d1321] tabular-nums">
              −€{Math.abs(tx.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
