import { VirtualCard } from "@/components/card/VirtualCard";
import { CardTransactions } from "@/components/card/CardTransactions";
import { Snowflake, SlidersHorizontal, Flag } from "lucide-react";

export default function CardPage() {
  return (
    <div className="min-h-screen bg-[#fafaf5]">
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-[24px] font-bold text-[#0d1321]">Card</h1>
      </div>

      <VirtualCard />

      {/* Card actions */}
      <div className="mx-4 mt-5 flex gap-3">
        {[
          { label: "Freeze card", icon: Snowflake },
          { label: "Manage limits", icon: SlidersHorizontal },
          { label: "Report issue", icon: Flag },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex-1 h-13 flex items-center justify-center gap-2 bg-white rounded-[20px] border border-[#e4e4dc] text-[14px] font-medium text-[#0d1321] hover:bg-[#f4f4ef] transition-colors shadow-[0_2px_8px_rgba(13,19,33,0.04)]"
          >
            <Icon size={18} className="text-[#4b5563]" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <CardTransactions />
    </div>
  );
}
