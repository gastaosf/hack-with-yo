"use client";

import { useAccount } from "wagmi";
import { useUserHistory } from "@yo-protocol/react";
import { formatUnits } from "viem";
import { YOEUR_VAULT } from "@/lib/constants";

export type TransactionItem = {
  id: string;
  type: "deposit" | "withdraw";
  label: string;
  amountFloat: number;
  date: Date;
  status: "confirmed";
};

export function useTransactionHistory() {
  const { address } = useAccount();
  const { history, isLoading } = useUserHistory(YOEUR_VAULT, address, { limit: 20 });

  // Debug: log raw YO history items to inspect tx.type values
  console.log("[Manna] YO history items:", history);

  const items: TransactionItem[] = history.map((tx) => {
    const txType = String(tx.type).toLowerCase();
    const isDeposit = txType === "deposit";
    const isWithdraw = txType === "withdrawal" || txType === "redeem_request";
    if (!isDeposit && !isWithdraw) {
      console.warn("[Manna] Unknown transaction type:", tx.type, tx);
    }
    // Use formatted value from SDK when available, fallback to raw/1e6
    const amount = tx.assets?.formatted
      ? parseFloat(String(tx.assets.formatted))
      : parseFloat(formatUnits(BigInt(tx.assets?.raw ?? "0"), 6));
    return {
      id: tx.transactionHash ?? String(Math.random()),
      type: isDeposit ? "deposit" : "withdraw",
      label: isDeposit ? "Bank Transfer In" : "Bank Transfer Out",
      amountFloat: isDeposit ? amount : -amount,
      date: new Date(tx.blockTimestamp ? tx.blockTimestamp * 1000 : Date.now()),
      status: "confirmed" as const,
    };
  });

  return { items, isLoading };
}
