"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { AmountInput } from "@/components/transfers/AmountInput";
import { useEurBalance } from "@/hooks/useEurBalance";
import { useRedeem } from "@yo-protocol/react";
import { YOEUR_VAULT, LINKED_BANK } from "@/lib/constants";
import { formatEur } from "@/lib/format";
import { sanitizeError } from "@/lib/errors";
import { CheckCircle2, Loader2, Building2 } from "lucide-react";

type WithdrawStep = "idle" | "confirming" | "submitting" | "complete" | "error";

export default function WithdrawPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [wStep, setWStep] = useState<WithdrawStep>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { balanceFloat, sharesRaw, isLoading: balanceLoading } = useEurBalance();

  const { redeem } = useRedeem({
    vault: YOEUR_VAULT,
    onSubmitted: (hash) => {
      setTxHash(hash);
      setWStep("submitting");
    },
    onConfirmed: () => setWStep("complete"),
    onError: (err) => {
      setError(sanitizeError(err));
      setWStep("error");
    },
  });

  const handleWithdraw = useCallback(async () => {
    setWStep("confirming");
    try {
      // Calculate proportional shares for the requested amount
      const requestedAmount = parseFloat(amount);
      const proportion = balanceFloat > 0 ? requestedAmount / balanceFloat : 0;
      const sharesNum = typeof sharesRaw === "bigint" ? Number(sharesRaw) : parseFloat(String(sharesRaw)) * 1e6;
      const sharesToRedeem = BigInt(Math.floor(sharesNum * proportion));
      await redeem(sharesToRedeem);
    } catch (err) {
      setError(sanitizeError(err));
      setWStep("error");
    }
  }, [amount, balanceFloat, sharesRaw, redeem]);

  const isAmountValid = amount && parseFloat(amount) > 0 && parseFloat(amount) <= balanceFloat;

  if (wStep === "complete") {
    return (
      <div className="page-enter">
        <PageHeader title="Withdrawal Initiated" />
        <div className="px-4 pt-12 flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#0d1321]">Transfer on its way</h2>
            <p className="text-sm text-gray-400 mt-2 px-4">
              €{parseFloat(amount).toLocaleString("en-IE", { minimumFractionDigits: 2 })} will arrive in{" "}
              <span className="font-medium text-[#0d1321]">Commerzbank ****{LINKED_BANK.lastFour}</span>{" "}
              within 1–2 business days.
            </p>
          </div>
          <button
            onClick={() => { setWStep("idle"); setAmount(""); router.replace("/dashboard"); }}
            className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (wStep === "confirming" || wStep === "submitting") {
    return (
      <div className="page-enter">
        <PageHeader title="Processing" />
        <div className="px-4 pt-16 flex flex-col items-center gap-6">
          <Loader2 size={36} className="text-[#0d1321] animate-spin" />
          <p className="text-sm text-gray-500">
            {wStep === "confirming" ? "Initiating transfer..." : "Confirming on network..."}
          </p>
        </div>
      </div>
    );
  }

  if (wStep === "error") {
    return (
      <div className="page-enter">
        <PageHeader title="Withdrawal Failed" showBack />
        <div className="px-4 pt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-bold text-[#0d1321]">Something went wrong</p>
          <p className="text-sm text-gray-400">{error ?? "Please try again"}</p>
          <button onClick={() => { setWStep("idle"); setError(null); }} className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold mt-4">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <PageHeader title="Withdraw" showBack />
      <div className="px-4 pt-6 flex flex-col gap-4">
        <div>
          <p className="text-base font-semibold text-[#0d1321] mb-1">How much would you like to withdraw?</p>
          {balanceLoading ? (
            <div className="skeleton h-4 w-32" />
          ) : (
            <p className="text-sm text-gray-400">
              Available: <span className="font-semibold text-[#0d1321]">{formatEur(balanceFloat)}</span>
            </p>
          )}
        </div>

        <AmountInput
          value={amount}
          onChange={setAmount}
          maxFloat={balanceFloat}
          disabled={balanceLoading}
        />

        {/* Destination */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={15} className="text-gray-400" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sending to</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0d1321]/5 flex items-center justify-center">
              <Building2 size={18} className="text-[#0d1321]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0d1321]">{LINKED_BANK.bank}</p>
              <p className="text-xs text-gray-400">****{LINKED_BANK.lastFour}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-xs text-blue-700">
            Withdrawals typically arrive within 1–2 business days. Interest continues to accrue until the transfer is processed.
          </p>
        </div>

        <button
          disabled={!isAmountValid || balanceLoading}
          onClick={handleWithdraw}
          className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold disabled:opacity-30 transition-opacity active:scale-[0.98]"
        >
          Withdraw {amount ? `€${parseFloat(amount).toLocaleString("en-IE", { minimumFractionDigits: 2 })}` : ""}
        </button>
      </div>
    </div>
  );
}
