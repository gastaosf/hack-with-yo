"use client";

import { useAccount } from "wagmi";
import { useUserPerformance, useYoClient } from "@yo-protocol/react";
import { useQuery } from "@tanstack/react-query";
import { YOEUR_VAULT } from "@/lib/constants";

export function useYieldStats() {
  const { address } = useAccount();
  const client = useYoClient();

  // Vault snapshot for APY (contains stats.yield['30d'])
  const { data: snapshot, isLoading: snapshotLoading } = useQuery({
    queryKey: ["yo-vault-snapshot", YOEUR_VAULT],
    queryFn: () => {
      if (!client) throw new Error("Client not available");
      return client.getVaultSnapshot(YOEUR_VAULT);
    },
    enabled: !!client,
    staleTime: 60_000,
  });

  const { performance: userPerf, isLoading: userLoading } = useUserPerformance(YOEUR_VAULT, address);

  // APY from snapshot yield field (string values like "0.042")
  const yieldData = snapshot?.stats?.yield;
  const apyRaw = yieldData?.["30d"] ?? yieldData?.["7d"] ?? yieldData?.["1d"] ?? null;
  const apyPercent = apyRaw != null ? parseFloat(String(apyRaw)) * 100 : null;

  // Yield earned from unrealized P&L (raw is string|number with 6 decimals)
  const yieldEarnedFloat = userPerf?.unrealized?.raw != null
    ? parseFloat(String(userPerf.unrealized.raw)) / 1e6
    : 0;

  return {
    apyPercent,
    yieldEarnedFloat,
    isLoading: snapshotLoading || userLoading,
  };
}
