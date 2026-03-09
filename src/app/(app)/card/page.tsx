"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { VirtualCard } from "@/components/card/VirtualCard";
import { CardTransactions } from "@/components/card/CardTransactions";
import { Snowflake, Play, Copy, CheckCircle2 } from "lucide-react";
import { CARD_DETAILS } from "@/lib/mock-data";

export default function CardPage() {
  const [frozen, setFrozen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("card-frozen");
    if (stored === "true") setFrozen(true);
  }, []);

  const toggleFreeze = () => {
    const next = !frozen;
    setFrozen(next);
    localStorage.setItem("card-frozen", String(next));
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(CARD_DETAILS.number.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-enter pb-6">
      <PageHeader title="Debit Card" />
      <VirtualCard frozen={frozen} />

      {/* Card actions */}
      <div className="flex gap-3 mx-4 mt-4">
        <button
          onClick={copyNumber}
          className="flex-1 flex flex-col items-center gap-2 bg-white rounded-xl py-3.5 shadow-sm active:scale-95 transition-transform"
        >
          {copied ? (
            <CheckCircle2 size={20} className="text-green-500" />
          ) : (
            <Copy size={20} className="text-gray-500" />
          )}
          <span className="text-xs font-medium text-gray-600">{copied ? "Copied!" : "Copy number"}</span>
        </button>

        <button
          onClick={toggleFreeze}
          className={`flex-1 flex flex-col items-center gap-2 rounded-xl py-3.5 shadow-sm active:scale-95 transition-all ${
            frozen ? "bg-blue-50" : "bg-white"
          }`}
        >
          {frozen ? (
            <Play size={20} className="text-blue-600" />
          ) : (
            <Snowflake size={20} className="text-blue-500" />
          )}
          <span className={`text-xs font-medium ${frozen ? "text-blue-600" : "text-gray-600"}`}>
            {frozen ? "Unfreeze" : "Freeze card"}
          </span>
        </button>
      </div>

      {/* Card info */}
      <div className="mx-4 mt-3 bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-xs text-gray-400">Card network</span>
          <span className="text-xs font-semibold text-[#0f1729]">{CARD_DETAILS.network}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-xs text-gray-400">Card type</span>
          <span className="text-xs font-semibold text-[#0f1729]">Virtual debit</span>
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
