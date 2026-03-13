"use client";

import { useState } from "react";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  maxFloat?: number;
  placeholder?: string;
  disabled?: boolean;
}

export function AmountInput({ value, onChange, maxFloat, placeholder = "0.00", disabled }: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    // Prevent multiple decimals
    const parts = raw.split(".");
    if (parts.length > 2) return;
    // Max 2 decimal places
    if (parts[1] && parts[1].length > 2) return;
    onChange(raw);
  };

  const setMax = () => {
    if (maxFloat != null) onChange(maxFloat.toFixed(2));
  };

  return (
    <div className="relative bg-white border-2 border-gray-100 rounded-xl focus-within:border-[#2d9f6f] transition-colors">
      <div className="flex items-center px-4 py-4">
        <span className="text-2xl font-light text-gray-400 mr-2">€</span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 text-2xl font-bold text-[#0d1321] bg-transparent outline-none tabular placeholder-gray-200"
        />
        {maxFloat != null && (
          <button
            type="button"
            onClick={setMax}
            className="text-xs font-semibold text-[#2d9f6f] bg-[#2d9f6f]/10 px-2.5 py-1 rounded-lg"
          >
            MAX
          </button>
        )}
      </div>
      {maxFloat != null && value && parseFloat(value) > maxFloat && (
        <p className="px-4 pb-3 text-xs text-red-500">
          Exceeds available balance
        </p>
      )}
    </div>
  );
}
