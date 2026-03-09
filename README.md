# Manna

B2B euro savings account for European companies. Companies earn yield on idle cash without touching crypto — just SEPA transfers and euros.

Built for the [Hack with YO](https://dorahacks.io) hackathon.

## How it works

1. Company transfers EUR via SEPA to a virtual IBAN
2. Funds are converted to EURC and deposited into YO's yoEUR vault on Base
3. Yield accrues — displayed as an Annual Return in euros
4. Funds are withdrawn back to the company's bank account on demand

Crypto is fully abstracted. Users see euros, bank transfers, and interest rates — nothing else.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (app router) + TypeScript |
| Vault SDK | `@yo-protocol/react` + `@yo-protocol/core` |
| Blockchain | wagmi v2 + viem v2, Base (chain 8453) |
| Wallets | Privy embedded smart wallets (invisible to user) |
| Data fetching | TanStack Query |
| Styling | Tailwind CSS (mobile-first) |
| PWA | next-pwa |

## Getting Started

**Prerequisites:** Node 18+, a [Privy](https://dashboard.privy.io) app with email login + embedded wallets enabled on Base.

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Set NEXT_PUBLIC_PRIVY_APP_ID in .env.local

# Run dev server
npm run dev
# → http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── login/              Email + OTP login (Privy)
│   └── (app)/
│       ├── dashboard/      Balance, yield stats, activity feed
│       ├── transfers/      Deposit (simulated SEPA) + Withdraw
│       ├── card/           Virtual spending card
│       └── settings/       Company info + logout
├── components/             Feature-grouped UI components
├── hooks/                  useEurBalance, useYieldStats, useTransactionHistory, useSimulatedSepa
└── lib/                    providers, wagmi config, constants, formatters, mock data
```

## Key Addresses (Base mainnet)

| Contract | Address |
|----------|---------|
| yoEUR vault | `0x50c749ae210d3977adc824ae11f3c7fd10c871e9` |
| EURC token | `0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42` |

## Demo Note

The demo wallet (Privy embedded wallet created on first login) must be pre-funded with EURC on Base before demoing deposits.
