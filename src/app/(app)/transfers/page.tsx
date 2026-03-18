"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ArrowDownLeft, ArrowUpRight, ChevronRight } from "lucide-react";

const options = [
  {
    href: "/transfers/deposit",
    icon: ArrowDownLeft,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    title: "Deposit funds",
    description: "Transfer EUR from your bank account",
  },
  {
    href: "/transfers/withdraw",
    icon: ArrowUpRight,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Withdraw funds",
    description: "Send EUR back to your bank account",
  },
];

export default function TransfersPage() {
  return (
    <div className="page-enter">
      <PageHeader title="Transfers" />
      <div className="px-4 pt-4 flex flex-col gap-3">
        {options.map(({ href, icon: Icon, iconBg, iconColor, title, description }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 bg-white rounded-xl px-4 py-4 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${iconBg}`}>
              <Icon size={20} className={iconColor} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0d1321]">{title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{description}</p>
            </div>
            <ChevronRight size={17} className="text-gray-300" />
          </Link>
        ))}

        <div className="mt-4 p-4 bg-[#0d1321]/5 rounded-xl">
          <p className="text-xs text-gray-500 leading-relaxed">
            Deposits are allocated to your savings account automatically. Withdrawals are
            transferred to your registered bank account within 1–2 business days.
          </p>
        </div>
      </div>

      <div className="mt-2 pb-6">
        <ActivityFeed paginated />
      </div>
    </div>
  );
}
