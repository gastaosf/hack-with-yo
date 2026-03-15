import { useAccount } from "wagmi";
import { useUserPerformance, useYoClient } from "@yo-protocol/react";
import { useQuery } from "@tanstack/react-query";
import { YOEUR_VAULT } from "../constants";

export function useYieldStats() {
  const { address } = useAccount();
  const client = useYoClient();
  const { data: snapshot, isLoading: snapshotLoading } = useQuery({
    queryKey: ["yo-vault-snapshot", YOEUR_VAULT],
    queryFn: () => { if (!client) throw new Error("Client not available"); return client.getVaultSnapshot(YOEUR_VAULT); },
    enabled: !!client,
    staleTime: 60_000,
  });
  const { performance: userPerf, isLoading: userLoading } = useUserPerformance(YOEUR_VAULT, address);
  const yieldData = snapshot?.stats?.yield;
  const apyRaw = yieldData?.["30d"] ?? yieldData?.["7d"] ?? yieldData?.["1d"] ?? null;
  const apyPercent = apyRaw != null ? parseFloat(String(apyRaw)) * 100 : null;
  const yieldEarnedFloat = userPerf?.unrealized?.raw != null ? parseFloat(String(userPerf.unrealized.raw)) / 1e6 : 0;
  return { apyPercent, yieldEarnedFloat, isLoading: snapshotLoading || userLoading };
}
