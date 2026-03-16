"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import {
  ArrowLeft,
  Building2,
  FileText,
  Mail,
  Shield,
  Monitor,
  Download,
  Globe,
  Bell,
  Calendar,
  ChevronRight,
  LogOut,
  Hash,
} from "lucide-react";
import { COMPANY_PROFILE, LINKED_BANK } from "@manna/shared";

interface SettingsRowProps {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  onClick?: () => void;
  showChevron?: boolean;
}

function SettingsRow({
  icon,
  label,
  value,
  onClick,
  showChevron = true,
}: SettingsRowProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#f4f4ef] transition-colors text-left border-b border-[#f0f0ea] last:border-0"
    >
      <span className="text-[#9ca3af]">{icon}</span>
      <span className="flex-1 text-[15px] font-medium text-[#0d1321]">
        {label}
      </span>
      {value && <span className="text-[14px] text-[#9ca3af]">{value}</span>}
      {showChevron && <ChevronRight size={16} className="text-[#9ca3af]" />}
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { logout, user } = usePrivy();

  const email = user?.email?.address ?? "—";

  return (
    <div className="min-h-screen bg-[#fafaf5]">
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f4f4ef]"
        >
          <ArrowLeft size={20} className="text-[#0d1321]" />
        </button>
        <h1 className="text-[20px] font-bold text-[#0d1321]">Settings</h1>
      </div>

      {/* Company section */}
      <div className="px-4 pt-2">
        <div className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-[0.06em] px-1 pb-2">
          Company
        </div>
        <div className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] overflow-hidden">
          <SettingsRow
            icon={<Building2 size={20} />}
            label="Company Name"
            value={COMPANY_PROFILE.name}
          />
          <SettingsRow
            icon={<FileText size={20} />}
            label="Business Registration"
            value={COMPANY_PROFILE.registration}
          />
          <SettingsRow
            icon={<Hash size={20} />}
            label="Country"
            value={COMPANY_PROFILE.country}
            showChevron={false}
          />
        </div>
      </div>

      {/* Bank section */}
      <div className="px-4 pt-5">
        <div className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-[0.06em] px-1 pb-2">
          Connected Bank
        </div>
        <div className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] overflow-hidden">
          <SettingsRow
            icon={<Building2 size={20} />}
            label="Bank Account"
            value={`${LINKED_BANK.bank} ••${LINKED_BANK.lastFour}`}
          />
          <SettingsRow
            icon={<FileText size={20} />}
            label="SEPA Mandate"
            value={
              <span className="text-[12px] font-semibold text-[#2d9f6f] bg-[#e8f5ef] px-2.5 py-1 rounded-full">
                Active
              </span>
            }
          />
        </div>
      </div>

      {/* Security section */}
      <div className="px-4 pt-5">
        <div className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-[0.06em] px-1 pb-2">
          Security
        </div>
        <div className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] overflow-hidden">
          <SettingsRow
            icon={<Mail size={20} />}
            label="Email"
            value={email}
          />
          <SettingsRow
            icon={<Shield size={20} />}
            label="Two-Factor Auth"
            value={
              <span className="text-[12px] font-semibold text-[#2d9f6f] bg-[#e8f5ef] px-2.5 py-1 rounded-full">
                Enabled
              </span>
            }
          />
          <SettingsRow
            icon={<Monitor size={20} />}
            label="Active Sessions"
            value="2 devices"
          />
          <SettingsRow
            icon={<Download size={20} />}
            label="Download Data"
            showChevron={false}
          />
        </div>
      </div>

      {/* Preferences section */}
      <div className="px-4 pt-5">
        <div className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-[0.06em] px-1 pb-2">
          Preferences
        </div>
        <div className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] overflow-hidden">
          <SettingsRow
            icon={<Globe size={20} />}
            label="Language"
            value="English (UK)"
          />
          <SettingsRow
            icon={<Bell size={20} />}
            label="Notifications"
            showChevron={false}
          />
          <SettingsRow
            icon={<Calendar size={20} />}
            label="Statement Frequency"
            value="Monthly"
          />
        </div>
      </div>

      {/* Sign out */}
      <div className="px-4 pt-6 pb-8">
        <button
          onClick={() => logout().then(() => router.replace("/login"))}
          className="w-full h-13 flex items-center justify-center gap-2 border border-[#e53e3e] text-[#e53e3e] rounded-full text-[15px] font-semibold hover:bg-[#fff5f5] transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
