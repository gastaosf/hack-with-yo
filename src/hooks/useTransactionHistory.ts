"use client";

import { useState, useCallback } from "react";
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
  txHash: string;
};

const PAGE_SIZE = 20;

export function useTransactionHistory(options?: { paginated?: boolean }) {
  const { address } = useAccount();
  const [limit, setLimit] = useState(PAGE_SIZE);
  const { history, isLoading, isError, refetch } = useUserHistory(YOEUR_VAULT, address, { limit });

  const items: TransactionItem[] = history.map((tx) => {
    const txType = String(tx.type).toLowerCase();
    const isDeposit = txType === "deposit";
    const isWithdraw = txType === "withdrawal" || txType === "redeem_request";
    if (!isDeposit && !isWithdraw) {
      console.warn("[Manna] Unknown transaction type:", tx.type, tx);
    }
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
      txHash: tx.transactionHash ?? "",
    };
  });

  const hasMore = options?.paginated ? items.length >= limit : false;

  const loadMore = useCallback(() => {
    setLimit((prev) => prev + PAGE_SIZE);
  }, []);

  return { items, isLoading, isError, refetch, hasMore, loadMore };
}
