"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { COMPANY_PROFILE } from "@/lib/mock-data";
import { Building2, Mail, LogOut, Shield, ChevronRight } from "lucide-react";
import { useAccount } from "wagmi";

export default function SettingsPage() {
  const { logout, user } = usePrivy();
  const { address } = useAccount();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="page-enter pb-6">
      <PageHeader title="Settings" />

      <div className="px-4 pt-4 flex flex-col gap-3">
        {/* Company info */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Company</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="w-12 h-12 rounded-xl bg-[#0d1321] flex items-center justify-center text-white font-bold text-lg">
              {COMPANY_PROFILE.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-[#0d1321]">{COMPANY_PROFILE.name}</p>
              <p className="text-xs text-gray-400">{COMPANY_PROFILE.registration} · {COMPANY_PROFILE.country}</p>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <Mail size={16} className="text-gray-400 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] text-gray-400">Email</p>
              <p className="text-sm font-medium text-[#0d1321]">
                {user?.email?.address ?? COMPANY_PROFILE.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Shield size={16} className="text-gray-400 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] text-gray-400">KYB Status</p>
              <p className="text-sm font-medium text-green-600">Verified ✓</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full bg-white rounded-xl shadow-sm px-4 py-4 text-left active:scale-[0.98] transition-transform"
        >
          <LogOut size={16} className="text-red-400 shrink-0" />
          <span className="flex-1 text-sm font-medium text-red-500">Sign out</span>
        </button>

        {/* Version */}
        <p className="text-center text-xs text-gray-300 mt-2">
          Manna v0.1.0 — Built for Hack with YO 2026
        </p>
      </div>
    </div>
  );
}
