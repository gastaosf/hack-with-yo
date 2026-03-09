"use client";

import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, CreditCard } from "lucide-react";

const actions = [
  { label: "Deposit", href: "/transfers/deposit", icon: ArrowDownLeft, color: "bg-green-50 text-green-700" },
  { label: "Withdraw", href: "/transfers/withdraw", icon: ArrowUpRight, color: "bg-blue-50 text-blue-700" },
  { label: "Card", href: "/card", icon: CreditCard, color: "bg-purple-50 text-purple-700" },
];

export function QuickActions() {
  return (
    <div className="flex gap-3 mx-4 mt-4">
      {actions.map(({ label, href, icon: Icon, color }) => (
        <Link
          key={href}
          href={href}
          className="flex-1 flex flex-col items-center gap-2 bg-white rounded-xl py-4 shadow-sm active:scale-95 transition-transform"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
            <Icon size={18} />
          </div>
          <span className="text-xs font-medium text-[#0f1729]">{label}</span>
        </Link>
      ))}
    </div>
  );
}
