"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ArrowUpDown, CreditCard, Settings } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/transfers", icon: ArrowUpDown, label: "Transfers" },
  { href: "/card", icon: CreditCard, label: "Card" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e4e4dc] shadow-[0_-1px_0_rgba(13,19,33,0.06)] z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-4 py-2 min-w-[44px] relative"
            >
              {active && (
                <span className="absolute top-0 w-1 h-1 rounded-full bg-[#2d9f6f]" />
              )}
              <Icon
                size={22}
                color={active ? "#2d9f6f" : "#9ca3af"}
                strokeWidth={active ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-medium tracking-wide ${
                  active ? "text-[#2d9f6f]" : "text-[#9ca3af]"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
