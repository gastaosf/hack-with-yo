"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { AmountInput } from "@/components/transfers/AmountInput";
import { useSimulatedSepa } from "@/hooks/useSimulatedSepa";
import { SEPA_DETAILS } from "@/lib/constants";
import { CheckCircle2, Copy, Loader2, Building2 } from "lucide-react";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-sm font-semibold text-[#0d1321] mt-0.5">{value}</p>
      </div>
      <button onClick={copy} className="ml-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        {copied ? (
          <CheckCircle2 size={16} className="text-green-500" />
        ) : (
          <Copy size={16} className="text-gray-400" />
        )}
      </button>
    </div>
  );
}

function StepIcon({ done, active }: { done?: boolean; active?: boolean }) {
  if (done) return <CheckCircle2 size={20} className="text-green-500" />;
  if (active) return <Loader2 size={20} className="text-[#2d9f6f] animate-spin" />;
  return <div className="w-5 h-5 rounded-full border-2 border-gray-200" />;
}

export default function DepositPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const { step, txHash, error, startDeposit, confirmTransferSent, reset } = useSimulatedSepa();

  const referenceCode = `MANNA-DEMO-001`;

  // Step 1: Amount entry
  if (step === "idle") {
    return (
      <div className="page-enter pb-24">
        <PageHeader title="Deposit" showBack />
        <div className="px-4 pt-6 flex flex-col gap-4">
          <div>
            <p className="text-base font-semibold text-[#0d1321] mb-1">How much would you like to deposit?</p>
            <p className="text-sm text-gray-400">Funds will start earning interest immediately after receipt.</p>
          </div>
          <AmountInput value={amount} onChange={setAmount} />
        </div>
        <div className="sticky bottom-0 bg-gradient-to-t from-[#fafaf5] via-[#fafaf5] pt-4 pb-6 px-4">
          <button
            disabled={!amount || parseFloat(amount) <= 0}
            onClick={() => startDeposit(amount)}
            className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold disabled:opacity-30 transition-opacity active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 2: SEPA bank details
  if (step === "showing_details") {
    return (
      <div className="page-enter pb-24">
        <PageHeader title="Bank Transfer Details" showBack />
        <div className="px-4 pt-4 flex flex-col gap-4">
          <div className="bg-[#0d1321] rounded-xl p-4 text-white">
            <p className="text-xs text-white/50 uppercase tracking-widest font-medium">Amount to transfer</p>
            <p className="text-3xl font-bold mt-1 tabular">€{parseFloat(amount).toLocaleString("en-IE", { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="bg-white rounded-xl px-4 shadow-sm">
            <div className="flex items-center gap-2 py-3 border-b border-gray-50">
              <Building2 size={16} className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bank transfer details</span>
            </div>
            <CopyField label="Recipient" value={SEPA_DETAILS.recipient} />
            <CopyField label="IBAN" value={SEPA_DETAILS.iban} />
            <CopyField label="BIC / SWIFT" value={SEPA_DETAILS.bic} />
            <CopyField label="Bank" value={SEPA_DETAILS.bank} />
            <CopyField label="Reference" value={referenceCode} />
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs text-amber-700 font-medium">
              ⚠️ Please include the reference code exactly as shown. This ensures your deposit is credited automatically.
            </p>
          </div>
        </div>
        <div className="sticky bottom-0 bg-gradient-to-t from-[#fafaf5] via-[#fafaf5] pt-4 pb-6 px-4">
          <button
            onClick={confirmTransferSent}
            className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold active:scale-[0.98]"
          >
            I&apos;ve sent the transfer
          </button>
          <button onClick={reset} className="w-full text-gray-400 text-sm py-2">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Step 3-5: Processing
  if (["verifying", "received", "depositing", "awaiting_transfer"].includes(step)) {
    const steps = [
      { label: "Verifying bank transfer", done: ["received", "depositing"].includes(step), active: step === "verifying" },
      { label: "Transfer received", done: step === "depositing", active: step === "received" },
      { label: "Allocating to savings account", done: false, active: step === "depositing" },
    ];

    return (
      <div className="page-enter">
        <PageHeader title="Processing" />
        <div className="px-4 pt-12 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#0d1321]/5 flex items-center justify-center">
            <Loader2 size={28} className="text-[#0d1321] animate-spin" />
          </div>
          <div className="w-full bg-white rounded-xl p-5 shadow-sm flex flex-col gap-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <StepIcon done={s.done} active={s.active} />
                <span className={`text-sm font-medium ${s.done ? "text-green-600" : s.active ? "text-[#0d1321]" : "text-gray-300"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Complete
  if (step === "complete") {
    return (
      <div className="page-enter">
        <PageHeader title="Transfer Complete" />
        <div className="px-4 pt-12 flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#0d1321]">Funds received</h2>
            <p className="text-sm text-gray-400 mt-2">
              €{parseFloat(amount).toLocaleString("en-IE", { minimumFractionDigits: 2 })} is now earning interest in your savings account.
            </p>
          </div>
          <button
            onClick={() => { reset(); router.replace("/dashboard"); }}
            className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold active:scale-[0.98]"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="page-enter">
      <PageHeader title="Transfer Failed" showBack />
      <div className="px-4 pt-12 flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-lg font-bold text-[#0d1321]">Something went wrong</p>
          <p className="text-sm text-gray-400 mt-2">{error ?? "Please try again"}</p>
        </div>
        <button onClick={reset} className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold">
          Try Again
        </button>
      </div>
    </div>
  );
}
