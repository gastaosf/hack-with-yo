"use client";
import { useRouter } from "next/navigation";
import { ArrowDownToLine, ArrowUpFromLine, ChevronRight } from "lucide-react";
import { useEurBalance, useTransactionHistory, formatEur } from "@manna/shared";

export default function TransfersPage() {
  const router = useRouter();
  const { balanceFloat } = useEurBalance();
  const { items } = useTransactionHistory();

  return (
    <div className="min-h-screen bg-[#fafaf5]">
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-[24px] font-bold text-[#0d1321]">Transfers</h1>
      </div>

      {/* Balance card */}
      <div className="mx-4 bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] p-5">
        <div className="text-[13px] text-[#9ca3af] mb-1">Available Balance</div>
        <div className="text-[32px] font-bold text-[#0d1321] tabular-nums">
          {formatEur(balanceFloat)}
        </div>
        <div className="text-[13px] text-[#2d9f6f] mt-1.5">Earning daily returns</div>
      </div>

      {/* Action cards */}
      <div className="mx-4 mt-4 space-y-3">
        <button
          onClick={() => router.push("/transfers/deposit")}
          className="w-full bg-[#2d9f6f] rounded-[20px] p-6 flex items-center gap-4 text-left hover:bg-[#1f7a52] transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <ArrowDownToLine size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[18px] font-bold text-white">Add Funds</div>
            <div className="text-[14px] text-white/75 mt-0.5">
              Transfer from your business bank account using SEPA
            </div>
          </div>
          <ChevronRight size={20} className="text-white/60" />
        </button>

        <button
          onClick={() => router.push("/transfers/withdraw")}
          className="w-full bg-white rounded-[20px] border border-[#e4e4dc] p-6 flex items-center gap-4 text-left hover:bg-[#f4f4ef] transition-colors shadow-[0_2px_8px_rgba(13,19,33,0.08)]"
        >
          <div className="w-12 h-12 rounded-full bg-[#e8f5ef] flex items-center justify-center flex-shrink-0">
            <ArrowUpFromLine size={24} className="text-[#2d9f6f]" />
          </div>
          <div className="flex-1">
            <div className="text-[18px] font-bold text-[#0d1321]">Withdraw</div>
            <div className="text-[14px] text-[#4b5563] mt-0.5">
              Send funds back to your registered bank account
            </div>
          </div>
          <ChevronRight size={20} className="text-[#9ca3af]" />
        </button>
      </div>

      {/* Recent transfers */}
      <div className="mx-4 mt-6 mb-4">
        <h3 className="text-[15px] font-semibold text-[#0d1321] mb-3">Recent Transfers</h3>
        <div className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <ArrowDownToLine size={32} className="text-[#9ca3af] mb-3" />
              <p className="text-[16px] font-semibold text-[#0d1321]">No transfers yet</p>
              <p className="text-[14px] text-[#9ca3af] mt-1 mb-4">Add funds to get started</p>
              <button
                onClick={() => router.push("/transfers/deposit")}
                className="px-5 py-2.5 bg-[#2d9f6f] text-white rounded-full font-semibold text-sm"
              >
                Add Funds
              </button>
            </div>
          ) : (
            items.slice(0, 6).map((item, i, arr) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-4 ${i < arr.length - 1 ? "border-b border-[#f0f0ea]" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${
                    item.type === "deposit" ? "bg-[#e8f5ef]" : "bg-[#f4f4ef]"
                  }`}
                >
                  {item.type === "deposit" ? (
                    <ArrowDownToLine size={18} className="text-[#2d9f6f]" />
                  ) : (
                    <ArrowUpFromLine size={18} className="text-[#4b5563]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-[#0d1321]">{item.label}</div>
                  <div className="text-[13px] text-[#9ca3af]">
                    {item.date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
