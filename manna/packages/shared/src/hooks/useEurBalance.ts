import { useAccount } from "wagmi";
import { useUserPosition } from "@yo-protocol/react";
import { YOEUR_VAULT } from "../constants";
import { formatUnits } from "viem";

export function useEurBalance() {
  const { address } = useAccount();
  const { position, isLoading, refetch } = useUserPosition(YOEUR_VAULT, address);
  const rawAssets: bigint = position?.assets ?? BigInt(0);
  const rawShares: bigint = position?.shares ?? BigInt(0);
  const assetsFloat = parseFloat(formatUnits(rawAssets, 6));
  const sharesFloat = parseFloat(formatUnits(rawShares, 6));
  return { balanceFloat: assetsFloat, sharesFloat, sharesRaw: rawShares, hasBalance: sharesFloat > 0, isLoading, refetch };
}
