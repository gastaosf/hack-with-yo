"use client";

import { useAccount } from "wagmi";
import { useYoClient } from "@yo-protocol/react";
import { useQuery } from "@tanstack/react-query";
import { YOEUR_VAULT } from "@/lib/constants";

const REFETCH_INTERVAL = 10_000;

export function useYieldStats() {
  const { address } = useAccount();
  const client = useYoClient();

  // Vault snapshot for APY — poll every 10s
  const { data: snapshot, isLoading: snapshotLoading, isError: snapshotError, refetch: refetchSnapshot } = useQuery({
    queryKey: ["yo-vault-snapshot", YOEUR_VAULT],
    queryFn: () => {
      if (!client) throw new Error("Client not available");
      return client.getVaultSnapshot(YOEUR_VAULT);
    },
    enabled: !!client,
    staleTime: REFETCH_INTERVAL,
    refetchInterval: REFETCH_INTERVAL,
  });

  // User performance — poll every 10s
  const { data: userPerf, isLoading: userLoading, isError: perfError, refetch: refetchPerf } = useQuery({
    queryKey: ["yo-user-performance", YOEUR_VAULT, address],
    queryFn: () => {
      if (!client || !address) throw new Error("Client or address not available");
      return client.getUserPerformance(YOEUR_VAULT, address);
    },
    enabled: !!client && !!address,
    staleTime: REFETCH_INTERVAL,
    refetchInterval: REFETCH_INTERVAL,
  });

  // APY from snapshot yield field (already a percentage, e.g. "2.3683" = 2.37%)
  // Prefer 1d (most current), fall back to 7d then 30d
  const yieldData = snapshot?.stats?.yield;
  const apyRaw = yieldData?.["1d"] ?? yieldData?.["7d"] ?? yieldData?.["30d"] ?? null;
  const baseApy = apyRaw != null ? parseFloat(String(apyRaw)) : null;

  // Add incentive rewards (merklRewardYield is a separate field)
  const incentiveApy = snapshot?.stats?.merklRewardYield != null
    ? parseFloat(String(snapshot.stats.merklRewardYield))
    : 0;

  const apyPercent = baseApy != null ? baseApy + incentiveApy : null;

  // Yield earned from unrealized P&L (raw is string|number with 6 decimals)
  const yieldEarnedFloat = userPerf?.unrealized?.raw != null
    ? Math.max(0, parseFloat(String(userPerf.unrealized.raw)) / 1e6)
    : 0;

  return {
    apyPercent,
    yieldEarnedFloat,
    isLoading: snapshotLoading || userLoading,
    isError: snapshotError || perfError,
    refetch: () => { refetchSnapshot(); refetchPerf(); },
  };
}
