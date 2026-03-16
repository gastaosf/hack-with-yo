"use client";
import React from "react";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  maxAmount?: number;
  quickAmounts?: number[];
}

export function AmountInput({
  value,
  onChange,
  maxAmount,
  quickAmounts = [5000, 10000, 50000, 100000],
}: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    onChange(raw);
  };

  const num = parseFloat(value) || 0;
  const isOverMax = maxAmount !== undefined && num > maxAmount;

  const filteredQuickAmounts =
    maxAmount !== undefined
      ? quickAmounts.filter((a) => a <= maxAmount)
      : quickAmounts;
  const showMax = maxAmount !== undefined;

  return (
    <div>
      <div
        className={`flex items-baseline gap-2 border-b-2 pb-3 transition-colors ${
          isOverMax
            ? "border-[#e53e3e]"
            : "border-[#e4e4dc] focus-within:border-[#2d9f6f]"
        }`}
      >
        <span className="text-[32px] font-normal text-[#9ca3af]">€</span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder="0"
          className="flex-1 text-[40px] font-bold text-[#0d1321] bg-transparent outline-none tabular-nums leading-none"
          aria-label="Amount in EUR"
        />
      </div>

      {isOverMax && (
        <p className="text-[13px] text-[#e53e3e] mt-2">
          Amount exceeds your available balance
        </p>
      )}

      {maxAmount !== undefined && (
        <p className="text-[13px] text-[#9ca3af] mt-2">
          Available:{" "}
          {new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: "EUR",
          }).format(maxAmount)}
        </p>
      )}

      <div className="flex gap-2 mt-4 flex-wrap">
        {filteredQuickAmounts.map((amount) => {
          const label =
            amount >= 1000
              ? `€${(amount / 1000).toFixed(0)}K`
              : `€${amount}`;
          const isActive = parseFloat(value) === amount;
          return (
            <button
              key={amount}
              onClick={() => onChange(String(amount))}
              className={`px-4 py-2 rounded-full text-[14px] font-medium border transition-colors ${
                isActive
                  ? "bg-[#e8f5ef] border-[#2d9f6f] text-[#2d9f6f]"
                  : "bg-[#f4f4ef] border-[#e4e4dc] text-[#4b5563] hover:border-[#c8c8be]"
              }`}
            >
              {label}
            </button>
          );
        })}
        {showMax && (
          <button
            onClick={() => onChange(String(maxAmount))}
            className={`px-4 py-2 rounded-full text-[14px] font-medium border transition-colors ${
              parseFloat(value) === maxAmount
                ? "bg-[#e8f5ef] border-[#2d9f6f] text-[#2d9f6f]"
                : "bg-[#f4f4ef] border-[#e4e4dc] text-[#4b5563] hover:border-[#c8c8be]"
            }`}
          >
            Max
          </button>
        )}
      </div>
    </div>
  );
}
