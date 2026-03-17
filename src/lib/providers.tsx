"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { YieldProvider } from "@yo-protocol/react";
import { base } from "viem/chains";
import { wagmiConfig } from "./wagmi-config";
import { CompanyProfileProvider } from "@/hooks/useCompanyProfile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchInterval: 60_000 },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
          showWalletUIs: false,
        },
        defaultChain: base,
        supportedChains: [base],
        loginMethods: ["email"],
        appearance: {
          theme: "light",
          logo: "/icons/icon-192.png",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <YieldProvider defaultSlippageBps={50}>
            <CompanyProfileProvider>
              {children}
            </CompanyProfileProvider>
          </YieldProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
