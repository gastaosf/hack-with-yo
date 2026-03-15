import { createConfig, http } from "@wagmi/core";
import { base } from "viem/chains";

export const wagmiConfig = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
});
