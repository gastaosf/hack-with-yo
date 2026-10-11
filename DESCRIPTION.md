# Manna — Put Your Idle Treasury to Work

## What is Manna?

Manna is a savings account for European companies. It lets finance teams earn up to 15% annual return on idle treasury cash — using nothing more than a standard SEPA bank transfer.

No crypto wallets. No seed phrases. No DeFi dashboards. Just a clean, familiar banking interface that any CFO can use from day one.

## The Problem

European SMEs and startups hold billions in low-yield bank accounts. Traditional treasury management tools are built for enterprises — complex, expensive, and inaccessible. Meanwhile, on-chain yield opportunities exist but require crypto expertise that finance teams don't have and compliance departments won't approve.

**The gap:** high-yield infrastructure exists on-chain, but there's no product that makes it accessible to normal businesses.

## How It Works

1. **Create a company account** — email sign-in, quick KYB verification
2. **Send a SEPA bank transfer** — standard wire to a real IBAN with a unique reference code
3. **Earn returns from day one** — funds are automatically allocated to a yield-generating vault
4. **Withdraw anytime** — funds return to your bank account within 1–2 business days

Behind the scenes, Manna converts EUR → EURC → yoEUR via the YO Protocol vault on Base. The user never sees any of this.

## Architecture

```
User (EUR)
  │
  ▼
SEPA Bank Transfer (simulated)
  │
  ▼
Manna Backend
  │
  ▼
EURC on Base ──► YO Protocol Vault ──► yoEUR (yield-bearing)
  │                                        │
  ▼                                        ▼
Privy Embedded Wallet              Auto-compounding yield
(invisible to user)                (real-time, 10s polling)
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Auth | Privy (email-only, embedded wallets created silently) |
| Blockchain | wagmi v3, viem v2, Base mainnet (chain 8453) |
| Yield | YO Protocol SDK (`@yo-protocol/react`, `@yo-protocol/core`) |
| Data | TanStack React Query (10s yield polling, 5s history polling) |
| Backend | Supabase (user profiles, card state) |
| Deployment | PWA (standalone mode, installable, notch-aware) |

### Key Contracts

| Contract | Address |
|----------|---------|
| yoEUR Vault | `0x50c749ae210d3977adc824ae11f3c7fd10c871e9` |
| EURC Token | `0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42` |
| yoGateway | `0xF1EeE0957267b1A474323Ff9CfF7719E964969FA` |

All amounts use 6 decimal precision with BigInt arithmetic to avoid floating-point errors.

## What We Built

### Chainless Banking UX
Every screen speaks the language of banking, not DeFi. Users see euros, annual returns, and bank transfers — never tokens, gas fees, or wallet addresses. The Privy embedded wallet is created silently on email sign-up and never surfaced in the UI.

### Simulated SEPA Flow
The deposit flow shows real bank transfer details (recipient, IBAN, BIC, reference code) and walks users through a realistic multi-step confirmation. Behind the scenes, it triggers the on-chain EURC → yoEUR deposit via the YO Protocol SDK.

### Real-Time Yield Display
The dashboard polls the YO vault snapshot every 10 seconds, showing live annual return percentage and cumulative interest earned — displayed as euros, automatically compounding.

### Smart Withdrawal
The withdraw flow handles proportional share calculation with BigInt precision, pre-approves the yoGateway to avoid RPC race conditions, and presents the entire process as a simple "send to bank account" action.

### Virtual Debit Card
Every account comes with a virtual card for day-to-day spending directly from the treasury balance. Users can copy details, freeze/unfreeze, and view card transactions.

### Mobile-First PWA
Standalone app mode, safe-area support for notched devices, installable on iOS and Android. Designed as a mobile banking app, not a website.

## Product Sections

| Section | What it does |
|---------|-------------|
| **Dashboard** | Total balance, annual return rate, interest earned, recent activity |
| **Transfers** | Deposit (SEPA in → on-chain) and withdraw (on-chain → SEPA out) |
| **Card** | Virtual debit card with freeze/unfreeze and transaction history |
| **Settings** | Company profile, KYB status, sign out |

## What Makes Manna Different

- **Zero crypto knowledge required** — the entire blockchain layer is invisible
- **Standard money rails** — SEPA transfers, not bridge UIs or swap interfaces
- **Institutional tone** — professional banking product, not a DeFi dashboard
- **Real yield** — powered by YO Protocol's audited vault strategy on Base
- **Instant onboarding** — email → KYB → funded account in under 2 minutes

## Team

Built for [Hack with YO 2026](https://dorahacks.io) on DoraHacks.

## Try It

```bash
npm install
npm run dev
# Open http://localhost:3000
```

> **Note:** The demo account must be pre-funded with EURC on Base before demoing. The SEPA flow is simulated — bank details are shown for realism, but the actual transfer is an on-chain EURC → yoEUR transaction.
