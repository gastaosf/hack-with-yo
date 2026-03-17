"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Building2, Mail, LogOut, Shield, Pencil, Check, X } from "lucide-react";

function EditableRow({
  icon: Icon,
  label,
  value,
  onSave,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  onSave?: (val: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    if (onSave && draft.trim()) {
      onSave(draft.trim());
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0">
      <Icon size={16} className="text-gray-400 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-400">{label}</p>
        {editing ? (
          <div className="flex items-center gap-2 mt-0.5">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="text-sm font-medium text-[#0d1321] bg-gray-50 rounded px-2 py-1 flex-1 min-w-0 focus:outline-none focus:ring-1 focus:ring-[#2d9f6f]"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
            <button onClick={handleSave} className="p-1 text-green-500">
              <Check size={16} />
            </button>
            <button onClick={handleCancel} className="p-1 text-gray-400">
              <X size={16} />
            </button>
          </div>
        ) : (
          <p className="text-sm font-medium text-[#0d1321]">{value}</p>
        )}
      </div>
      {onSave && !editing && (
        <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <Pencil size={14} className="text-gray-400" />
        </button>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const { logout, user } = usePrivy();
  const router = useRouter();
  const { profile, saveProfile, isDemoAccount } = useCompanyProfile();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const displayName = profile?.name ?? "Your Company";
  const displayEmail = profile?.email ?? user?.email?.address ?? "";
  const displayRegistration = profile?.registration ?? "";
  const displayCountry = profile?.country ?? "";

  const updateField = (field: string, value: string) => {
    if (!profile) return;
    saveProfile({ ...profile, [field]: value });
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
              {displayName[0]}
            </div>
            <div className="flex-1 min-w-0">
              {isDemoAccount ? (
                <>
                  <p className="text-sm font-bold text-[#0d1321]">{displayName}</p>
                  <p className="text-xs text-gray-400">{displayRegistration} · {displayCountry}</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-[#0d1321]">{displayName}</p>
                  <p className="text-xs text-gray-400">{displayRegistration} · {displayCountry}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
          </div>
          <EditableRow
            icon={Building2}
            label="Company Name"
            value={displayName}
            onSave={isDemoAccount ? undefined : (val) => updateField("name", val)}
          />
          <EditableRow
            icon={Mail}
            label="Email"
            value={displayEmail}
            onSave={isDemoAccount ? undefined : (val) => updateField("email", val)}
          />
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Shield size={16} className="text-gray-400 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] text-gray-400">KYB Status</p>
              <p className="text-sm font-medium text-green-600">Verified</p>
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
