'use client';
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { YieldProvider } from "@yo-protocol/react";
import { wagmiConfig } from "./wagmi-config";

// NOTE: @privy-io/expo 0.7.0 is installed but deferred — the wagmi embedded
// wallet flow for the hackathon demo works without it. Privy auth can be
// layered in by wrapping children with <PrivyProvider appId={...}> once the
// Expo SDK integration is confirmed stable.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchInterval: 60_000 },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <YieldProvider defaultSlippageBps={50}>{children}</YieldProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
