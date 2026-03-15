"use client";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "default" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d9f6f] focus-visible:ring-offset-2";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#2d9f6f] text-white hover:bg-[#1f7a52] hover:-translate-y-px hover:shadow-[0_4px_16px_-4px_rgba(45,159,111,0.40)] active:translate-y-0",
  secondary:
    "bg-[#f4f4ef] text-[#0d1321] border border-[#e4e4dc] hover:border-[#c8c8be] hover:bg-white",
  ghost:
    "bg-transparent text-[#4b5563] border border-[#c8c8be] hover:border-[#2d9f6f] hover:text-[#2d9f6f]",
  destructive:
    "bg-transparent text-[#e53e3e] border border-[#e53e3e] hover:bg-[#fff5f5]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  default: "h-11 px-6 text-sm",
  lg: "h-13 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "default",
  loading,
  disabled,
  children,
  className = "",
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
