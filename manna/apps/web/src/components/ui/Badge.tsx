import React from "react";

type Variant = "success" | "error" | "warning" | "info" | "neutral";

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const styles: Record<Variant, string> = {
  success: "bg-[#e8f5ef] text-[#2d9f6f]",
  error: "bg-[#fff5f5] text-[#e53e3e]",
  warning: "bg-[#fffbeb] text-[#d97706]",
  info: "bg-[#eff6ff] text-[#3b82f6]",
  neutral: "bg-[#f4f4ef] text-[#4b5563]",
};

export function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
