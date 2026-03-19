"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, CreditCard, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/transfers", icon: ArrowLeftRight, label: "Transfers" },
  { href: "/card", icon: CreditCard, label: "Card" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/onboarding")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-[768px] mx-auto px-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 flex-1 py-2 transition-colors"
            >
              <Icon
                size={22}
                className={active ? "text-[#0d1321]" : "text-gray-400"}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className={`text-[10px] font-medium tracking-wide ${
                  active ? "text-[#0d1321]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
              {active && (
                <span className="absolute bottom-0 h-0.5 w-8 rounded-full bg-[#2d9f6f]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
