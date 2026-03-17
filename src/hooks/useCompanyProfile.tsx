"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { COMPANY_PROFILE } from "@/lib/mock-data";

const DEMO_EMAIL = "gastaosousafaria@gmail.com";

export interface CompanyProfile {
  name: string;
  country: string;
  registration: string;
  email: string;
  onboardingComplete: boolean;
}

const DEMO_PROFILE: CompanyProfile = {
  ...COMPANY_PROFILE,
  onboardingComplete: true,
};

function dbRowToProfile(row: Record<string, unknown>): CompanyProfile {
  return {
    name: (row.company_name as string) ?? "",
    country: (row.country as string) ?? "",
    registration: (row.registration as string) ?? "",
    email: (row.email as string) ?? "",
    onboardingComplete: (row.onboarding_complete as boolean) ?? false,
  };
}

interface CompanyProfileContextValue {
  profile: CompanyProfile | null;
  saveProfile: (updated: CompanyProfile) => Promise<void>;
  isDemoAccount: boolean;
  isOnboarded: boolean;
  isLoading: boolean;
  cardFrozen: boolean;
  setCardFrozen: (frozen: boolean) => Promise<void>;
}

const CompanyProfileContext = createContext<CompanyProfileContextValue | null>(null);

export function CompanyProfileProvider({ children }: { children: React.ReactNode }) {
  const { user, ready, getAccessToken } = usePrivy();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [cardFrozen, setCardFrozenState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const privyEmail = user?.email?.address;
  const isDemoAccount = privyEmail === DEMO_EMAIL;

  // Fetch profile from API
  useEffect(() => {
    if (!ready) return;

    if (isDemoAccount) {
      setProfile(DEMO_PROFILE);
      setCardFrozenState(false);
      setIsLoading(false);
      return;
    }

    if (!user) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchProfile() {
      try {
        const token = await getAccessToken();
        if (!token || cancelled) return;

        const res = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const { profile: row } = await res.json();
        if (cancelled) return;

        if (row) {
          setProfile(dbRowToProfile(row));
          setCardFrozenState(row.card_frozen ?? false);
        }
      } catch {
        // Profile doesn't exist yet — that's fine
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [isDemoAccount, ready, user, getAccessToken]);

  const saveProfile = useCallback(
    async (updated: CompanyProfile) => {
      if (isDemoAccount) return;

      // Optimistic update
      setProfile(updated);

      try {
        const token = await getAccessToken();
        if (!token) return;

        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updated),
        });

        if (!res.ok) throw new Error("Failed to save profile");

        const { profile: row } = await res.json();
        if (row) setProfile(dbRowToProfile(row));
      } catch {
        // Revert on failure — refetch
        setProfile(updated);
      }
    },
    [isDemoAccount, getAccessToken]
  );

  const setCardFrozen = useCallback(
    async (frozen: boolean) => {
      setCardFrozenState(frozen);

      if (isDemoAccount) return;

      try {
        const token = await getAccessToken();
        if (!token) return;

        await fetch("/api/card/frozen", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ frozen }),
        });
      } catch {
        // Revert on failure
        setCardFrozenState(!frozen);
      }
    },
    [isDemoAccount, getAccessToken]
  );

  const value: CompanyProfileContextValue = {
    profile,
    saveProfile,
    isDemoAccount,
    isOnboarded: isDemoAccount || (profile?.onboardingComplete ?? false),
    isLoading,
    cardFrozen,
    setCardFrozen,
  };

  return (
    <CompanyProfileContext value={value}>
      {children}
    </CompanyProfileContext>
  );
}

export function useCompanyProfile() {
  const ctx = useContext(CompanyProfileContext);
  if (!ctx) {
    throw new Error("useCompanyProfile must be used within CompanyProfileProvider");
  }
  return ctx;
}
