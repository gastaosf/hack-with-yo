import { useState, useCallback } from "react";
import { useDeposit } from "@yo-protocol/react";
import { YOEUR_VAULT, EURC_ADDRESS, CHAIN_ID } from "../constants";
import { parseEurAmount } from "../format";

type SepaStep = "idle" | "showing_details" | "awaiting_transfer" | "verifying" | "received" | "depositing" | "complete" | "error";

export function useSimulatedSepa() {
  const [step, setStep] = useState<SepaStep>("idle");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { deposit, step: depositStep } = useDeposit({
    vault: YOEUR_VAULT,
    onSubmitted: (hash) => { setTxHash(hash); setStep("depositing"); },
    onConfirmed: () => { setStep("complete"); },
    onError: (err) => { setError(err.message ?? "Transfer failed"); setStep("error"); },
  });
  const startDeposit = useCallback((eurAmount: string) => {
    setAmount(eurAmount); setStep("showing_details"); setError(null); setTxHash(null);
  }, []);
  const confirmTransferSent = useCallback(async () => {
    setStep("verifying");
    await new Promise((r) => setTimeout(r, 2000));
    setStep("received");
    await new Promise((r) => setTimeout(r, 800));
    try {
      const parsedAmount = parseEurAmount(amount);
      await deposit({ token: EURC_ADDRESS, amount: parsedAmount, chainId: CHAIN_ID });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transfer failed");
      setStep("error");
    }
  }, [amount, deposit]);
  const reset = useCallback(() => { setStep("idle"); setAmount(""); setTxHash(null); setError(null); }, []);
  return { step, amount, txHash, error, depositStep, startDeposit, confirmTransferSent, reset };
}
