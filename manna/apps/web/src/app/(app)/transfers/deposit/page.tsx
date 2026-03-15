"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Check, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useSimulatedSepa, SEPA_DETAILS, formatEur } from "@manna/shared";
import { AmountInput } from "@/components/transfers/AmountInput";
import { Button } from "@/components/ui/Button";

export default function DepositPage() {
  const router = useRouter();
  const [inputAmount, setInputAmount] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const { step, startDeposit, confirmTransferSent, reset, error } =
    useSimulatedSepa();

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text.replace(/\s/g, ""));
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const numAmount = parseFloat(inputAmount) || 0;

  if (step === "complete") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#e8f5ef] flex items-center justify-center mb-6">
          <Check size={40} className="text-[#2d9f6f]" strokeWidth={3} />
        </div>
        <h2 className="text-[28px] font-bold text-[#0d1321]">Funds received!</h2>
        <p className="text-[16px] text-[#4b5563] mt-3 max-w-xs leading-relaxed">
          {numAmount > 0 ? formatEur(numAmount) : "Your funds"} has been added
          to your treasury balance.
        </p>
        <p className="text-[14px] text-[#2d9f6f] mt-2">
          You&apos;re now earning annual returns on this amount.
        </p>
        <Button
          className="mt-8 w-full"
          onClick={() => {
            reset();
            router.push("/dashboard");
          }}
        >
          Go to Dashboard →
        </Button>
      </div>
    );
  }

  if (
    step === "verifying" ||
    step === "received" ||
    step === "depositing"
  ) {
    const steps = [
      { label: "Transfer sent", done: true },
      {
        label: "Payment received",
        done: step === "received" || step === "depositing",
      },
      { label: "Balance credited", done: false },
    ];
    return (
      <div className="min-h-screen bg-[#fafaf5] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#e4e4dc] border-t-[#2d9f6f] animate-spin mb-6" />
        <h2 className="text-[20px] font-semibold text-[#0d1321]">
          Processing Transfer
        </h2>
        <p className="text-[15px] text-[#4b5563] mt-3 max-w-[280px] leading-relaxed">
          Once we receive your payment, your balance will be updated immediately.
        </p>
        <div className="mt-8 space-y-3 w-full max-w-[280px] text-left">
          {steps.map(({ label, done }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  done ? "bg-[#2d9f6f]" : "bg-[#f0f0ea]"
                }`}
              >
                {done && (
                  <Check size={11} className="text-white" strokeWidth={3} />
                )}
              </div>
              <span
                className={`text-[15px] font-medium ${
                  done ? "text-[#0d1321]" : "text-[#9ca3af]"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const showingDetails =
    step === "showing_details" || step === "awaiting_transfer";

  return (
    <div className="min-h-screen bg-[#fafaf5]">
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <button
          onClick={() => {
            if (showingDetails) reset();
            else router.back();
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f4f4ef]"
        >
          <ArrowLeft size={20} className="text-[#0d1321]" />
        </button>
        <h1 className="text-[20px] font-bold text-[#0d1321]">
          {showingDetails ? "Bank Transfer Details" : "Add Funds"}
        </h1>
      </div>

      <div className="px-5 pb-32">
        {!showingDetails ? (
          <>
            <p className="text-[18px] font-semibold text-[#0d1321] mb-6">
              How much would you like to add?
            </p>
            <AmountInput value={inputAmount} onChange={setInputAmount} />
          </>
        ) : (
          <>
            <p className="text-[15px] text-[#4b5563] leading-relaxed mb-5">
              Transfer exactly this amount from your business bank account. Use
              the reference code so we can match your payment.
            </p>
            <div className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] overflow-hidden">
              {[
                { label: "BANK NAME", value: SEPA_DETAILS.recipient },
                { label: "IBAN", value: SEPA_DETAILS.iban },
                { label: "BIC / SWIFT", value: SEPA_DETAILS.bic },
                { label: "AMOUNT", value: formatEur(numAmount) },
                { label: "REFERENCE", value: "MNR-2026-A7F3" },
              ].map(({ label, value }, i, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-4 py-3.5 ${
                    i < arr.length - 1 ? "border-b border-[#f0f0ea]" : ""
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-medium text-[#9ca3af] tracking-wider uppercase mb-0.5">
                      {label}
                    </div>
                    <div className="text-[15px] font-semibold text-[#0d1321]">
                      {value}
                    </div>
                  </div>
                  <button
                    onClick={() => copy(value, label)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f4f4ef] text-[#9ca3af] hover:text-[#2d9f6f] transition-colors"
                    aria-label={`Copy ${label}`}
                  >
                    {copied === label ? (
                      <Check size={16} className="text-[#2d9f6f]" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3 bg-[#fffbeb] rounded-[14px] p-4 border-l-4 border-[#d97706]">
              <AlertTriangle
                size={18}
                className="text-[#d97706] flex-shrink-0 mt-0.5"
              />
              <p className="text-[13px] text-[#d97706] leading-relaxed">
                Include the reference code exactly as shown so we can match your
                payment.
              </p>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-[#fff5f5] rounded-[14px]">
                <p className="text-[13px] text-[#e53e3e]">{error}</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fafaf5] border-t border-[#e4e4dc]">
        {!showingDetails ? (
          <Button
            className="w-full"
            size="lg"
            disabled={numAmount <= 0}
            onClick={() => startDeposit(inputAmount)}
          >
            Continue →
          </Button>
        ) : (
          <div className="space-y-2">
            <Button className="w-full" size="lg" onClick={confirmTransferSent}>
              I&apos;ve Sent the Transfer
            </Button>
            <button
              onClick={reset}
              className="w-full py-2.5 text-[14px] text-[#9ca3af] hover:text-[#4b5563]"
            >
              I&apos;ll do this later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
