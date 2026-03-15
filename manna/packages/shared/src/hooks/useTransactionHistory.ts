import { useAccount } from "wagmi";
import { useUserHistory } from "@yo-protocol/react";
import { YOEUR_VAULT } from "../constants";

export type TransactionItem = {
  id: string; type: "deposit" | "withdraw"; label: string;
  amountFloat: number; date: Date; status: "confirmed";
};

export function useTransactionHistory() {
  const { address } = useAccount();
  const { history, isLoading } = useUserHistory(YOEUR_VAULT, address, { limit: 20 });
  const items: TransactionItem[] = history.map((tx) => {
    const isDeposit = tx.type === "deposit";
    const amount = parseFloat(String(tx.assets?.raw ?? "0"));
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
