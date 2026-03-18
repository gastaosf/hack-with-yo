"use client";

import { useState } from "react";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { formatEur } from "@/lib/format";
import { ErrorCard } from "@/components/shared/ErrorCard";
import { ArrowDownLeft, ArrowUpRight, ChevronDown } from "lucide-react";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatFullDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function truncateHash(hash: string): string {
  if (!hash || hash.length < 12) return hash || "—";
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

export function ActivityFeed({ paginated }: { paginated?: boolean } = {}) {
  const { items, isLoading, isError, refetch, hasMore, loadMore } = useTransactionHistory({ paginated });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-4 mt-3 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-[#0d1321]">Recent Activity</h2>
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
      ) : isError ? (
        <div className="py-6">
          <ErrorCard onRetry={refetch} />
        </div>
      ) : items.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-sm">
          <p>No transactions yet</p>
          <p className="text-xs mt-1 text-gray-300">Your activity will appear here</p>
        </div>
      ) : (
        <>
          <ul>
            {items.map((item, idx) => {
              const isExpanded = expandedId === item.id;
              return (
                <li key={item.id} className={idx < items.length - 1 ? "border-b border-gray-50" : ""}>
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="flex items-center gap-3 px-4 py-3.5 w-full text-left active:bg-gray-50 transition-colors"
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
                      <p className="text-sm font-medium text-[#0d1321] truncate">{item.label}</p>
                      <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
                    </div>
                    <span
                      className={`text-sm font-semibold tabular shrink-0 ${
                        item.amountFloat >= 0 ? "text-green-600" : "text-[#0d1321]"
                      }`}
                    >
                      {item.amountFloat >= 0 ? "+" : ""}
                      {formatEur(Math.abs(item.amountFloat))}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-300 shrink-0 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-3 pt-0 ml-12 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      <div>
                        <p className="text-gray-400">Date</p>
                        <p className="text-[#0d1321] font-medium">{formatFullDate(item.date)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Status</p>
                        <p className="text-green-600 font-medium">Confirmed</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Reference</p>
                        <p className="text-[#0d1321] font-medium font-mono">{truncateHash(item.txHash)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Type</p>
                        <p className="text-[#0d1321] font-medium">{item.type === "deposit" ? "Deposit" : "Withdrawal"}</p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {paginated && hasMore && (
            <button
              onClick={loadMore}
              className="w-full py-3 text-sm font-medium text-[#2d9f6f] border-t border-gray-50 active:bg-gray-50 transition-colors"
            >
              Show more
            </button>
          )}
        </>
      )}
    </div>
  );
}
