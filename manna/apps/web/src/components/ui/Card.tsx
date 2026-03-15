import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  const base =
    "bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08),0_0_1px_rgba(13,19,33,0.04)]";
  return (
    <div className={`${base} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
