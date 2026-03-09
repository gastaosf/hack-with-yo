"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { CARD_DETAILS } from "@/lib/mock-data";

interface VirtualCardProps {
  frozen: boolean;
}

export function VirtualCard({ frozen }: VirtualCardProps) {
  const [showCvv, setShowCvv] = useState(false);

  return (
    <div className="relative card-3d mx-4 mt-4">
      {/* Card body */}
      <div
        className="relative overflow-hidden rounded-2xl p-5 shadow-2xl"
        style={{
          background: frozen
            ? "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)"
            : "linear-gradient(135deg, #0f1729 0%, #1a2744 60%, #2a3a5c 100%)",
          minHeight: 200,
          transition: "background 0.5s ease",
        }}
      >
        {/* Background orbs */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 bg-[#c9a84c]" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full opacity-5 bg-white" />

        {/* Frozen overlay */}
        {frozen && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#2d3748]/80 backdrop-blur-sm z-10">
            <div className="text-center text-white">
              <div className="text-4xl mb-2">❄️</div>
              <p className="text-sm font-semibold">Card Frozen</p>
            </div>
          </div>
        )}

        <div className="relative z-0">
          {/* Top row */}
          <div className="flex justify-between items-start">
            <div className="text-white text-base font-bold tracking-widest">manna</div>
            <div className="w-10 h-7 rounded-sm bg-[#c9a84c]/80 flex items-center justify-center">
              <div className="w-7 h-5 rounded-full border border-[#c9a84c]/30" />
            </div>
          </div>

          {/* Chip */}
          <div className="mt-6 w-10 h-7 rounded bg-[#c9a84c]/90 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5 opacity-50">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-[#0f1729]/60 rounded-sm" />
              ))}
            </div>
          </div>

          {/* Card number */}
          <div className="mt-5 text-white/90 text-lg font-mono tracking-[0.2em]">
            {CARD_DETAILS.number}
          </div>

          {/* Bottom row */}
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Card Holder</p>
              <p className="text-xs text-white/80 font-medium">{CARD_DETAILS.holder}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Expires</p>
              <p className="text-xs text-white/80 font-medium">{CARD_DETAILS.expiry}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">CVV</p>
              <div className="flex items-center gap-1">
                <p className="text-xs text-white/80 font-mono">
                  {showCvv ? CARD_DETAILS.cvv : "•••"}
                </p>
                <button
                  onClick={() => setShowCvv(!showCvv)}
                  className="text-white/40"
                >
                  {showCvv ? <EyeOff size={11} /> : <Eye size={11} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
