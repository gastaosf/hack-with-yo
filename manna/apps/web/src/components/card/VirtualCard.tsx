"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { CARD_DETAILS } from "@manna/shared";

export function VirtualCard() {
  const [showNumber, setShowNumber] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const maskedNumber = "•••• •••• •••• " + CARD_DETAILS.number.slice(-4);

  return (
    <div
      className="mx-4 rounded-[28px] shadow-xl overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(135deg, #0d1321 0%, #1a2f4a 60%, #1e3d3d 100%)",
        aspectRatio: "1.586",
      }}
    >
      <div className="h-full p-6 flex flex-col">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-lg tracking-wide">
            manna
          </span>
          <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
            {CARD_DETAILS.network}
          </span>
        </div>

        {/* Card number */}
        <div className="mt-auto mb-4 flex items-center gap-2">
          <span className="text-white/90 text-xl font-medium tracking-[0.12em]">
            {showNumber ? CARD_DETAILS.number : maskedNumber}
          </span>
          <button
            onClick={() => setShowNumber(!showNumber)}
            className="p-1 text-white/50 hover:text-white/80 transition-colors"
            aria-label={showNumber ? "Hide card number" : "Show card number"}
          >
            {showNumber ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">
              Valid Thru
            </div>
            <div className="text-white font-medium">{CARD_DETAILS.expiry}</div>
          </div>
          <div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">
              CVV
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white font-medium">
                {showCvv ? CARD_DETAILS.cvv : "•••"}
              </span>
              <button
                onClick={() => setShowCvv(!showCvv)}
                className="text-white/50 hover:text-white/80 transition-colors"
                aria-label={showCvv ? "Hide CVV" : "Show CVV"}
              >
                {showCvv ? <EyeOff size={12} /> : <Eye size={12} />}
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/80 text-sm font-medium tracking-[0.06em]">
              {CARD_DETAILS.holder}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
