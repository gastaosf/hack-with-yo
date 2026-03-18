"use client";

import { AlertCircle, RotateCw } from "lucide-react";

export function ErrorCard({ message, onRetry }: { message?: string; onRetry: () => void }) {
  return (
    <div className="mx-4 mt-3 bg-white rounded-xl p-6 shadow-sm flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <AlertCircle size={20} className="text-red-400" />
      </div>
      <p className="text-sm text-gray-500 text-center">{message ?? "Something went wrong"}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 text-sm font-medium text-[#2d9f6f] active:scale-95 transition-transform"
      >
        <RotateCw size={14} />
        Tap to retry
      </button>
    </div>
  );
}
