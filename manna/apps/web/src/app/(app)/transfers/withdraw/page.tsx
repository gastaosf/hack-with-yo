"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Building2 } from "lucide-react";
import { useState } from "react";
import { useRedeem } from "@yo-protocol/react";
import { YOEUR_VAULT, LINKED_BANK, formatEur, useEurBalance } from "@manna/shared";
import { AmountInput } from "@/components/transfers/AmountInput";
import { Button } from "@/components/ui/Button";

type WithdrawStep = "idle" | "confirm" | "processing" | "success" | "error";

export default function WithdrawPage() {
  const router = useRouter();
  const [inputAmount, setInputAmount] = useState("");
  const [wStep, setWStep] = useState<WithdrawStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const { balanceFloat, sharesRaw } = useEurBalance();

  const { redeem } = useRedeem({
    vault: YOEUR_VAULT,
    onSubmitted: () => setWStep("processing"),
    onConfirmed: () => setWStep("success"),
    onError: (err: Error) => {
      setError(err.message ?? "Withdrawal failed");
      setWStep("error");
    },
  });

  const numAmount = parseFloat(inputAmount) || 0;
  const isOverBalance = numAmount > balanceFloat;

  const handleConfirm = async () => {
    setWStep("processing");
    try {
      const fraction = balanceFloat > 0 ? numAmount / balanceFloat : 0;
      const sharesToRedeem = BigInt(Math.floor(Number(sharesRaw) * fraction));
      await redeem(sharesToRedeem);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Withdrawal failed");
      setWStep("error");
    }
  };

  if (wStep === "success") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#e8f5ef] flex items-center justify-center mb-6">
          <Check size={40} className="text-[#2d9f6f]" strokeWidth={3} />
        </div>
        <h2 className="text-[28px] font-bold text-[#0d1321]">
          Withdrawal sent!
        </h2>
        <p className="text-[16px] text-[#4b5563] mt-3 max-w-xs leading-relaxed">
          {formatEur(numAmount)} is on its way to your bank account. It will
          arrive within 1 business day.
        </p>
        <Button
          className="mt-8 w-full"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard →
        </Button>
      </div>
    );
  }

  if (wStep === "processing") {
    return (
      <div className="min-h-screen bg-[#fafaf5] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#e4e4dc] border-t-[#2d9f6f] animate-spin mb-6" />
        <h2 className="text-[20px] font-semibold text-[#0d1321]">
          Processing withdrawal...
        </h2>
        <p className="text-[15px] text-[#4b5563] mt-3">
          This usually takes a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf5]">
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <button
          onClick={() =>
            wStep === "confirm" ? setWStep("idle") : router.back()
          }
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f4f4ef]"
        >
          <ArrowLeft size={20} className="text-[#0d1321]" />
        </button>
        <h1 className="text-[20px] font-bold text-[#0d1321]">
          Withdraw Funds
        </h1>
      </div>

      <div className="px-5 pb-32">
        {wStep === "idle" ? (
          <>
            <p className="text-[18px] font-semibold text-[#0d1321] mb-6">
              How much would you like to withdraw?
            </p>
            <AmountInput
              value={inputAmount}
              onChange={setInputAmount}
              maxAmount={balanceFloat}
              quickAmounts={[1000, 5000, 10000]}
            />
          </>
        ) : (
          <>
            <p className="text-[18px] font-semibold text-[#0d1321] mb-5">
              Sending to your bank account
            </p>
            <div className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f4f4ef] flex items-center justify-center">
                  <Building2 size={22} className="text-[#4b5563]" />
                </div>
                <div className="flex-1">
                  <div className="text-[16px] font-semibold text-[#0d1321]">
                    {LINKED_BANK.bank}
                  </div>
                  <div className="text-[14px] text-[#9ca3af]">
                    •••• •••• •••• {LINKED_BANK.lastFour}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#f0f0ea] flex justify-between items-center">
                <span className="text-[15px] text-[#4b5563]">
                  You will receive
                </span>
                <span className="text-[16px] font-semibold text-[#0d1321] tabular-nums">
                  {formatEur(numAmount)}
                </span>
              </div>
              <div className="mt-2 text-[13px] text-[#9ca3af]">
                Arrives in 1 business day
              </div>
            </div>
            {(error || wStep === "error") && (
              <div className="mt-4 p-4 bg-[#fff5f5] rounded-[14px]">
                <p className="text-[13px] text-[#e53e3e]">
                  {error ?? "Withdrawal failed. Please try again."}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fafaf5] border-t border-[#e4e4dc]">
        <Button
          className="w-full"
          size="lg"
          disabled={numAmount <= 0 || isOverBalance}
          onClick={() =>
            wStep === "idle" ? setWStep("confirm") : handleConfirm()
          }
        >
          {wStep === "idle" ? "Continue →" : "Confirm Withdrawal →"}
        </Button>
      </div>
    </div>
  );
}
