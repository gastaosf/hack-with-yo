"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { VirtualCard } from "@/components/card/VirtualCard";
import { CardTransactions } from "@/components/card/CardTransactions";
import { Snowflake, Play, Copy, CheckCircle2, SlidersHorizontal, AlertTriangle } from "lucide-react";
import { CARD_DETAILS } from "@/lib/mock-data";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";

export default function CardPage() {
  const { profile, cardFrozen: frozen, setCardFrozen } = useCompanyProfile();
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggleFreeze = () => {
    setCardFrozen(!frozen);
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(CARD_DETAILS.number.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showComingSoon = (label: string) => {
    setToast(label);
    setTimeout(() => setToast(null), 2000);
  };

  const holderName = profile?.name?.toUpperCase() ?? CARD_DETAILS.holder;

  return (
    <div className="page-enter pb-6">
      <PageHeader title="Debit Card" />
      <VirtualCard frozen={frozen} holderName={holderName} />

      {/* Card actions */}
      <div className="grid grid-cols-4 gap-2 mx-4 mt-4">
        <button
          onClick={copyNumber}
          className="flex flex-col items-center gap-2 bg-white rounded-xl py-3.5 shadow-sm active:scale-95 transition-transform"
        >
          {copied ? (
            <CheckCircle2 size={20} className="text-green-500" />
          ) : (
            <Copy size={20} className="text-gray-500" />
          )}
          <span className="text-[10px] font-medium text-gray-600">{copied ? "Copied!" : "Copy"}</span>
        </button>

        <button
          onClick={toggleFreeze}
          className={`flex flex-col items-center gap-2 rounded-xl py-3.5 shadow-sm active:scale-95 transition-all ${
            frozen ? "bg-blue-50" : "bg-white"
          }`}
        >
          {frozen ? (
            <Play size={20} className="text-blue-600" />
          ) : (
            <Snowflake size={20} className="text-blue-500" />
          )}
          <span className={`text-[10px] font-medium ${frozen ? "text-blue-600" : "text-gray-600"}`}>
            {frozen ? "Unfreeze" : "Freeze"}
          </span>
        </button>

        <button
          onClick={() => showComingSoon("Manage limits")}
          className="flex flex-col items-center gap-2 bg-white rounded-xl py-3.5 shadow-sm active:scale-95 transition-transform"
        >
          <SlidersHorizontal size={20} className="text-gray-500" />
          <span className="text-[10px] font-medium text-gray-600">Limits</span>
        </button>

        <button
          onClick={() => showComingSoon("Report issue")}
          className="flex flex-col items-center gap-2 bg-white rounded-xl py-3.5 shadow-sm active:scale-95 transition-transform"
        >
          <AlertTriangle size={20} className="text-gray-500" />
          <span className="text-[10px] font-medium text-gray-600">Report</span>
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0d1321] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg animate-fade-in">
          {toast} — coming soon
        </div>
      )}

      {/* Card info */}
      <div className="mx-4 mt-3 bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-xs text-gray-400">Card network</span>
          <span className="text-xs font-semibold text-[#0d1321]">{CARD_DETAILS.network}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-xs text-gray-400">Card type</span>
          <span className="text-xs font-semibold text-[#0d1321]">Virtual debit</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-xs text-gray-400">Status</span>
          <span className={`text-xs font-semibold ${frozen ? "text-blue-500" : "text-green-500"}`}>
            {frozen ? "Frozen" : "Active"}
          </span>
        </div>
      </div>

      <CardTransactions />
    </div>
  );
}
