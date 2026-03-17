"use client";

import { CARD_TRANSACTIONS } from "@/lib/mock-data";
import { formatEur } from "@/lib/format";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { CreditCard } from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  Cloud: "☁️",
  Office: "🏢",
  Software: "💻",
  Travel: "✈️",
  HR: "👥",
};

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "short",
  }).format(new Date(dateStr));
}

export function CardTransactions() {
  const { isDemoAccount } = useCompanyProfile();

  if (!isDemoAccount) {
    return (
      <div className="mx-4 mt-3 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <h2 className="text-sm font-semibold text-[#0d1321]">Card Transactions</h2>
        </div>
        <div className="flex flex-col items-center gap-3 py-10 px-4">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
            <CreditCard size={20} className="text-gray-300" />
          </div>
          <p className="text-sm text-gray-400 text-center">No transactions yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 mt-3 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-[#0d1321]">Card Transactions</h2>
      </div>
      <ul>
        {CARD_TRANSACTIONS.map((tx, idx) => (
          <li
            key={tx.id}
            className={`flex items-center gap-3 px-4 py-3.5 ${
              idx < CARD_TRANSACTIONS.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-base shrink-0">
              {CATEGORY_ICONS[tx.category] ?? "💳"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0d1321] truncate">{tx.merchant}</p>
              <p className="text-xs text-gray-400">{formatDate(tx.date)}</p>
            </div>
            <span className="text-sm font-semibold tabular text-[#0d1321] shrink-0">
              {formatEur(tx.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
