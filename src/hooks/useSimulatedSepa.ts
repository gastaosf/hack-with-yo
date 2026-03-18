"use client";

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeposit } from "@yo-protocol/react";
import { YOEUR_VAULT, EURC_ADDRESS, CHAIN_ID } from "@/lib/constants";
import { parseEurAmount } from "@/lib/format";
import { sanitizeError } from "@/lib/errors";

type SepaStep =
  | "idle"
  | "showing_details"
  | "awaiting_transfer"
  | "verifying"
  | "received"
  | "depositing"
  | "complete"
  | "error";

export function useSimulatedSepa() {
  const queryClient = useQueryClient();
  const [step, setStep] = useState<SepaStep>("idle");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { deposit, step: depositStep } = useDeposit({
    vault: YOEUR_VAULT,
    onSubmitted: (hash) => {
      setTxHash(hash);
      setStep("depositing");
    },
    onConfirmed: () => {
      queryClient.invalidateQueries();
      setStep("complete");
    },
    onError: (err) => {
      setError(sanitizeError(err));
      setStep("error");
    },
  });

  const startDeposit = useCallback((eurAmount: string) => {
    setAmount(eurAmount);
    setStep("showing_details");
    setError(null);
    setTxHash(null);
  }, []);

  const confirmTransferSent = useCallback(async () => {
    setStep("verifying");
    // Simulate bank processing delay
    await new Promise((r) => setTimeout(r, 2000));
    setStep("received");
    await new Promise((r) => setTimeout(r, 800));

    try {
      const parsedAmount = parseEurAmount(amount);
      await deposit({
        token: EURC_ADDRESS,
        amount: parsedAmount,
        chainId: CHAIN_ID,
      });
    } catch (err) {
      setError(sanitizeError(err));
      setStep("error");
    }
  }, [amount, deposit]);

  const reset = useCallback(() => {
    setStep("idle");
    setAmount("");
    setTxHash(null);
    setError(null);
  }, []);

  return {
    step,
    amount,
    txHash,
    error,
    depositStep,
    startDeposit,
    confirmTransferSent,
    reset,
  };
}
