export function sanitizeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);

  // User rejected / cancelled
  if (msg.includes("rejected") || msg.includes("denied"))
    return "Transaction was cancelled. Please try again.";

  // Insufficient funds
  if (msg.includes("insufficient") || msg.includes("exceeds balance"))
    return "Insufficient funds for this transaction.";

  // Network / RPC errors
  if (msg.includes("network") || msg.includes("timeout") || msg.includes("RPC"))
    return "Network error. Please check your connection and try again.";

  // Generic fallback — never show raw message
  return "Something went wrong. Please try again.";
}
