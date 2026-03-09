"use client";

import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { formatEur } from "@/lib/format";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function ActivityFeed() {
  const { items, isLoading } = useTransactionHistory();

  return (
    <div className="mx-4 mt-3 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-[#0f1729]">Recent Activity</h2>
      </div>

      {isLoading ? (
        <div className="p-4 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="skeleton w-9 h-9 rounded-full" />
              <div className="flex-1">
                <div className="skeleton h-3.5 w-32 mb-1.5" />
                <div className="skeleton h-3 w-16" />
              </div>
              <div className="skeleton h-4 w-20" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-sm">
          <p>No transactions yet</p>
          <p className="text-xs mt-1 text-gray-300">Your activity will appear here</p>
        </div>
      ) : (
        <ul>
          {items.map((item, idx) => (
            <li
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3.5 ${
                idx < items.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  item.type === "deposit" ? "bg-green-50" : "bg-gray-50"
                }`}
              >
                {item.type === "deposit" ? (
                  <ArrowDownLeft size={16} className="text-green-600" />
                ) : (
                  <ArrowUpRight size={16} className="text-gray-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0f1729] truncate">{item.label}</p>
                <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
              </div>
              <span
                className={`text-sm font-semibold tabular shrink-0 ${
                  item.amountFloat >= 0 ? "text-green-600" : "text-[#0f1729]"
                }`}
              >
                {item.amountFloat >= 0 ? "+" : ""}
                {formatEur(Math.abs(item.amountFloat))}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
