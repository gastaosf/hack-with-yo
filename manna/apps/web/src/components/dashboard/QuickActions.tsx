"use client";
import { useRouter } from "next/navigation";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export function QuickActions() {
  const router = useRouter();
  return (
    <div className="mx-4 mt-6 flex gap-3">
      <button
        onClick={() => router.push("/transfers/deposit")}
        className="flex-1 h-13 flex items-center justify-center gap-2 bg-[#2d9f6f] rounded-[20px] text-white font-semibold text-[15px] hover:bg-[#1f7a52] transition-colors"
      >
        <ArrowDownToLine size={18} />
        Add Funds
      </button>
      <button
        onClick={() => router.push("/transfers/withdraw")}
        className="flex-1 h-13 flex items-center justify-center gap-2 bg-white rounded-[20px] text-[#0d1321] font-semibold text-[15px] border border-[#e4e4dc] hover:border-[#c8c8be] transition-colors"
      >
        <ArrowUpFromLine size={18} />
        Withdraw
      </button>
    </div>
  );
}
