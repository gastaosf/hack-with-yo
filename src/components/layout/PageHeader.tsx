"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
}

export function PageHeader({ title, showBack, right }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 pt-safe h-14 bg-white border-b border-gray-100 shrink-0">
      <div className="w-10">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-[#0f1729]" />
          </button>
        )}
      </div>
      <h1 className="text-[15px] font-semibold text-[#0f1729] tracking-tight">{title}</h1>
      <div className="w-10 flex justify-end">{right}</div>
    </header>
  );
}
