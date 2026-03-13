"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { CARD_DETAILS } from "@/lib/mock-data";

interface VirtualCardProps {
  frozen: boolean;
}

// Falling particles — fixed positions so they're stable (no random on each render)
const PARTICLES = [
  { x: 72, y: 18, r: 7 },
  { x: 82, y: 32, r: 9 },
  { x: 65, y: 44, r: 6 },
  { x: 78, y: 58, r: 11 },
  { x: 86, y: 28, r: 5 },
  { x: 58, y: 22, r: 4 },
  { x: 90, y: 50, r: 8 },
  { x: 70, y: 68, r: 13 },
];

export function VirtualCard({ frozen }: VirtualCardProps) {
  const [showCvv, setShowCvv] = useState(false);

  return (
    <div className="relative card-3d mx-4 mt-4">
      <div
        className="relative overflow-hidden rounded-2xl p-5 shadow-2xl"
        style={{
          background: frozen
            ? "linear-gradient(135deg, #374151 0%, #1f2937 100%)"
            : "linear-gradient(135deg, #0d1321 0%, #1a2240 70%, #0f2a1e 100%)",
          minHeight: 200,
          transition: "background 0.5s ease",
        }}
      >
        {/* Falling particles SVG background */}
        {!frozen && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {PARTICLES.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.r / 10}
                fill="#2d9f6f"
                opacity={0.12 + (i % 3) * 0.05}
              />
            ))}
            {/* Subtle diagonal line accent */}
            <line x1="50" y1="0" x2="110" y2="80" stroke="#2d9f6f" strokeWidth="0.3" opacity="0.08" />
            <line x1="60" y1="0" x2="120" y2="80" stroke="#4ec99b" strokeWidth="0.2" opacity="0.06" />
          </svg>
        )}

        {/* Frozen overlay */}
        {frozen && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#1f2937]/80 backdrop-blur-sm z-10">
            <div className="text-center text-white">
              <div className="text-4xl mb-2">❄️</div>
              <p className="text-sm font-semibold">Card Frozen</p>
            </div>
          </div>
        )}

        <div className="relative z-0">
          {/* Top row */}
          <div className="flex justify-between items-start">
            <div className="text-white text-base font-semibold tracking-[0.18em]">manna</div>
            {/* Emerald chip accent (top-right) */}
            <div
              className="w-10 h-7 rounded-sm flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2d9f6f 0%, #4ec99b 100%)" }}
            >
              <div className="w-7 h-4 rounded-sm border border-white/20" />
            </div>
          </div>

          {/* EMV Chip */}
          <div
            className="mt-6 w-10 h-7 rounded flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2d9f6f 0%, #1a6b47 100%)" }}
          >
            <div className="grid grid-cols-2 gap-0.5 opacity-60">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-[#0d1321]/50 rounded-sm" />
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
