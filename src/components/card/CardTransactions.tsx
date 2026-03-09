import { CARD_TRANSACTIONS } from "@/lib/mock-data";
import { formatEur } from "@/lib/format";

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
  return (
    <div className="mx-4 mt-3 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-[#0f1729]">Card Transactions</h2>
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
              <p className="text-sm font-medium text-[#0f1729] truncate">{tx.merchant}</p>
              <p className="text-xs text-gray-400">{formatDate(tx.date)}</p>
            </div>
            <span className="text-sm font-semibold tabular text-[#0f1729] shrink-0">
              {formatEur(tx.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
