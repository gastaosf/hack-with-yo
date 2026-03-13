# CLAUDE.md — Manna

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (must pass before commit)
npm run start    # serve production build
```

No test suite configured.

## Architecture Rules (do not change)

- **All amounts in EUR** — never show EURC, yoEUR, tokens, or crypto amounts
- **Terminology**: "Annual Return" (not APY), "Bank Transfer In/Out" (not deposit/redeem)
- **No crypto visible to users** — no wallet addresses, gas fees, chain names, tx hashes
- **Auth is email-only** — Privy embedded wallet is created silently behind the scenes
- **SEPA is simulated** — the UI shows real bank details and delays, but triggers a real on-chain EURC→yoEUR tx
- **Demo account must be pre-funded** with EURC on Base before demoing

## Code Conventions

- Next.js app router, `src/` directory layout
- Components grouped by feature: `src/components/{layout,dashboard,transfers,card}/`
- Hooks in `src/hooks/`, shared utilities in `src/lib/`
- Tailwind CSS for all styling, mobile-first
- TypeScript strict mode, `target: ES2020` (required for BigInt)
- `'use client'` on any component using hooks, event handlers, or browser APIs

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | Vault + token addresses, chain ID |
| `src/lib/format.ts` | `formatEur`, `parseEurAmount`, `formatPercentage` |
| `src/lib/providers.tsx` | Provider stack: Privy → QueryClient → Wagmi → YieldProvider |
| `src/lib/wagmi-config.ts` | Wagmi config scoped to Base via `@privy-io/wagmi` |
| `src/lib/mock-data.ts` | Card details, company profile, mock transactions |

## Design Tokens

| Token | Value |
|-------|-------|
| Primary (midnight) | `#0d1321` |
| Accent (emerald) | `#2d9f6f` |
| Accent (mint) | `#4ec99b` |
| Background | `#fafaf5` |
| Font | Outfit (Google Fonts) |

Tone: professional banking product, not DeFi. No playful language, no crypto jargon.

## YO SDK Quick Reference

```ts
// Read
useUserPosition(vault, address)        // → { position: { shares, assets } }
useUserPerformance(vault, address)     // → { performance: { realized, unrealized } }
useUserHistory(vault, address, { limit }) // → { history: UserHistoryItem[] }

// APY: client.getVaultSnapshot(vault) → snapshot.stats.yield['30d'] (e.g. "0.042")

// Write
useDeposit({ vault, onSubmitted, onConfirmed, onError })
  → deposit({ token: Address, amount: bigint, chainId?: number })

useRedeem({ vault, onSubmitted, onConfirmed, onError })
  → redeem(shares: bigint)
```

## Key Addresses (Base mainnet, chain 8453)

- yoEUR vault: `0x50c749ae210d3977adc824ae11f3c7fd10c871e9`
- EURC token: `0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42`
- yoGateway: `0xF1EeE0957267b1A474323Ff9CfF7719E964969FA`
- Decimals: 6
