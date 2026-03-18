# Dashboard & UX Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement 7 functional improvements to the Manna B2B savings app: pull-to-refresh, transaction detail expand, pagination, cache invalidation after transfers, logout confirmation, error states, and animated balance.

**Architecture:** All changes are in the existing Next.js app router codebase. New shared `ErrorCard` component. Hooks gain error/refetch exposure. `ActivityFeed` becomes expandable and optionally paginated. Cache invalidation uses React Query's `queryClient.invalidateQueries()`.

**Tech Stack:** Next.js, React, TypeScript, TanStack Query, react-countup, @yo-protocol/react, Tailwind CSS

---

### Task 1: ErrorCard shared component

**Files:**
- Create: `src/components/shared/ErrorCard.tsx`

**Step 1: Create ErrorCard component**

```tsx
// src/components/shared/ErrorCard.tsx
"use client";

import { AlertCircle, RotateCw } from "lucide-react";

export function ErrorCard({ message, onRetry }: { message?: string; onRetry: () => void }) {
  return (
    <div className="mx-4 mt-3 bg-white rounded-xl p-6 shadow-sm flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <AlertCircle size={20} className="text-red-400" />
      </div>
      <p className="text-sm text-gray-500 text-center">{message ?? "Something went wrong"}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 text-sm font-medium text-[#2d9f6f] active:scale-95 transition-transform"
      >
        <RotateCw size={14} />
        Tap to retry
      </button>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (component is unused but valid)

**Step 3: Commit**

```
feat: add ErrorCard shared component for data fetch failures
```

---

### Task 2: Expose error + refetch from hooks

**Files:**
- Modify: `src/hooks/useEurBalance.ts`
- Modify: `src/hooks/useYieldStats.ts`
- Modify: `src/hooks/useTransactionHistory.ts`

**Step 1: Update useEurBalance to expose isError + refetch**

In `src/hooks/useEurBalance.ts`, the hook already returns `refetch` from `useUserPosition`. Add `isError`:

```ts
// Change line 10:
const { position, isLoading, isError, refetch } = useUserPosition(YOEUR_VAULT, address);

// Change return (add isError):
return {
  balanceFloat: assetsFloat,
  sharesFloat,
  sharesRaw: rawShares,
  hasBalance: sharesFloat > 0,
  isLoading,
  isError,
  refetch,
};
```

**Step 2: Update useYieldStats to expose isError + refetch**

In `src/hooks/useYieldStats.ts`, both queries already return error state from `useQuery`. Expose combined error + individual refetches:

```ts
// Update the snapshot query destructure (around line 15):
const { data: snapshot, isLoading: snapshotLoading, isError: snapshotError, refetch: refetchSnapshot } = useQuery({...});

// Update the performance query destructure (around line 28):
const { data: userPerf, isLoading: userLoading, isError: perfError, refetch: refetchPerf } = useQuery({...});

// Update return:
return {
  apyPercent,
  yieldEarnedFloat,
  isLoading: snapshotLoading || userLoading,
  isError: snapshotError || perfError,
  refetch: () => { refetchSnapshot(); refetchPerf(); },
};
```

**Step 3: Update useTransactionHistory to expose isError + refetch, remove console.log**

In `src/hooks/useTransactionHistory.ts`:

```ts
// Line 19 — add isError, refetch:
const { history, isLoading, isError, refetch } = useUserHistory(YOEUR_VAULT, address, { limit: 20 });

// Delete line 22 (console.log):
// console.log("[Manna] YO history items:", history);

// Update return:
return { items, isLoading, isError, refetch };
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```
feat: expose error states and refetch from data hooks
```

---

### Task 3: Add error states to dashboard components

**Files:**
- Modify: `src/components/dashboard/BalanceCard.tsx`
- Modify: `src/components/dashboard/YieldSummary.tsx`
- Modify: `src/components/dashboard/ActivityFeed.tsx`

**Step 1: Add error state to BalanceCard**

In `src/components/dashboard/BalanceCard.tsx`:

```tsx
// Add import:
import { ErrorCard } from "@/components/shared/ErrorCard";

// Update hook destructure:
const { balanceFloat, isLoading: balanceLoading, isError: balanceError, refetch: refetchBalance } = useEurBalance();
const { apyPercent, isLoading: yieldLoading, isError: yieldError, refetch: refetchYield } = useYieldStats();

// After `const isLoading = ...`, add:
const isError = balanceError || yieldError;

// Before the return, add early return for error:
if (isError && !isLoading) {
  return <ErrorCard onRetry={() => { refetchBalance(); refetchYield(); }} />;
}
```

**Step 2: Add error state to YieldSummary**

In `src/components/dashboard/YieldSummary.tsx`:

```tsx
// Add import:
import { ErrorCard } from "@/components/shared/ErrorCard";

// Update hook destructures:
const { apyPercent, yieldEarnedFloat, isLoading, isError, refetch } = useYieldStats();
const { balanceFloat, isLoading: balanceLoading } = useEurBalance();

// After the empty-state check (balanceFloat === 0), add error check:
if (isError && !isLoading) {
  return <ErrorCard onRetry={refetch} />;
}
```

**Step 3: Add error state to ActivityFeed**

In `src/components/dashboard/ActivityFeed.tsx`:

```tsx
// Add imports:
import { ErrorCard } from "@/components/shared/ErrorCard";

// Update hook destructure:
const { items, isLoading, isError, refetch } = useTransactionHistory();

// Inside the component, after the loading skeleton block and before the empty-state check,
// add an error check:
// After `{isLoading ? (... skeleton ...) : isError ? (`
// Replace the ternary chain to include error state between loading and empty:
```

The full ternary in ActivityFeed's render becomes:
```
{isLoading ? (
  <skeleton markup>
) : isError ? (
  <div className="py-6">
    <ErrorCard onRetry={refetch} />
  </div>
) : items.length === 0 ? (
  <empty state markup>
) : (
  <ul>...</ul>
)}
```

Note: ErrorCard inside ActivityFeed gets wrapped in a div without mx-4 since it's already inside the feed container.

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```
feat: add error states with retry to dashboard components
```

---

### Task 4: Pull-to-refresh button in DashboardHeader

**Files:**
- Modify: `src/components/dashboard/DashboardHeader.tsx`

**Step 1: Add refresh button**

```tsx
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Bell, RotateCw } from "lucide-react";

export function DashboardHeader() {
  const { profile } = useCompanyProfile();
  const queryClient = useQueryClient();
  const [spinning, setSpinning] = useState(false);
  const displayName = profile?.name ?? "Your Company";

  const handleRefresh = () => {
    setSpinning(true);
    queryClient.invalidateQueries();
    setTimeout(() => setSpinning(false), 1000);
  };

  return (
    <header className="flex items-center justify-between px-4 pt-safe h-14">
      <div>
        <p className="text-xs text-gray-400 font-medium">Welcome back</p>
        <p className="text-sm font-bold text-[#0d1321]">{displayName}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleRefresh}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        >
          <RotateCw
            size={17}
            className={`text-gray-400 transition-transform ${spinning ? "animate-spin" : ""}`}
          />
        </button>
        <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
          <Bell size={17} className="text-gray-400" />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#0d1321] flex items-center justify-center text-white text-sm font-bold shadow-sm">
          {displayName[0]}
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```
feat: add refresh button to dashboard header
```

---

### Task 5: Transaction detail inline expand in ActivityFeed

**Files:**
- Modify: `src/hooks/useTransactionHistory.ts` (add txHash and fullDate to TransactionItem)
- Modify: `src/components/dashboard/ActivityFeed.tsx` (expandable rows)

**Step 1: Extend TransactionItem type with detail fields**

In `src/hooks/useTransactionHistory.ts`, update the type and mapping:

```ts
export type TransactionItem = {
  id: string;
  type: "deposit" | "withdraw";
  label: string;
  amountFloat: number;
  date: Date;
  status: "confirmed";
  txHash: string;
};
```

The `txHash` is already used as `id` — just also store it explicitly. Update the mapping:

```ts
return {
  id: tx.transactionHash ?? String(Math.random()),
  type: isDeposit ? "deposit" : "withdraw",
  label: isDeposit ? "Bank Transfer In" : "Bank Transfer Out",
  amountFloat: isDeposit ? amount : -amount,
  date: new Date(tx.blockTimestamp ? tx.blockTimestamp * 1000 : Date.now()),
  status: "confirmed" as const,
  txHash: tx.transactionHash ?? "",
};
```

**Step 2: Make ActivityFeed rows expandable**

In `src/components/dashboard/ActivityFeed.tsx`, add expand/collapse state:

```tsx
"use client";

import { useState } from "react";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { formatEur } from "@/lib/format";
import { ArrowDownLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { ErrorCard } from "@/components/shared/ErrorCard";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatFullDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function truncateHash(hash: string): string {
  if (!hash || hash.length < 12) return hash || "—";
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

export function ActivityFeed({ onLoadMore, hasMore }: { onLoadMore?: () => void; hasMore?: boolean }) {
  const { items, isLoading, isError, refetch } = useTransactionHistory();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-4 mt-3 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-[#0d1321]">Recent Activity</h2>
      </div>

      {isLoading ? (
        <div className="p-4 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="skeleton w-9 h-9 rounded-full" />
              <div className="flex-1">
                <div className="skeleton h-3.5 w-32 mb-1.5" />
                <div className="skeleton h-3 w-16" />
              </div>
              <div className="skeleton h-4 w-20" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="py-6">
          <ErrorCard onRetry={refetch} />
        </div>
      ) : items.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-sm">
          <p>No transactions yet</p>
          <p className="text-xs mt-1 text-gray-300">Your activity will appear here</p>
        </div>
      ) : (
        <>
          <ul>
            {items.map((item, idx) => {
              const isExpanded = expandedId === item.id;
              return (
                <li key={item.id} className={idx < items.length - 1 ? "border-b border-gray-50" : ""}>
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="flex items-center gap-3 px-4 py-3.5 w-full text-left active:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        item.type === "deposit" ? "bg-green-50" : "bg-gray-50"
                      }`}
                    >
                      {item.type === "deposit" ? (
                        <ArrowDownLeft size={16} className="text-green-600" />
                      ) : (
                        <ArrowUpRight size={16} className="text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0d1321] truncate">{item.label}</p>
                      <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
                    </div>
                    <span
                      className={`text-sm font-semibold tabular shrink-0 ${
                        item.amountFloat >= 0 ? "text-green-600" : "text-[#0d1321]"
                      }`}
                    >
                      {item.amountFloat >= 0 ? "+" : ""}
                      {formatEur(Math.abs(item.amountFloat))}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-300 shrink-0 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-3 pt-0 ml-12 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      <div>
                        <p className="text-gray-400">Date</p>
                        <p className="text-[#0d1321] font-medium">{formatFullDate(item.date)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Status</p>
                        <p className="text-green-600 font-medium">Confirmed</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Reference</p>
                        <p className="text-[#0d1321] font-medium font-mono">{truncateHash(item.txHash)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Type</p>
                        <p className="text-[#0d1321] font-medium">{item.type === "deposit" ? "Deposit" : "Withdrawal"}</p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {onLoadMore && hasMore && (
            <button
              onClick={onLoadMore}
              className="w-full py-3 text-sm font-medium text-[#2d9f6f] border-t border-gray-50 active:bg-gray-50 transition-colors"
            >
              Show more
            </button>
          )}
        </>
      )}
    </div>
  );
}
```

Note: `ActivityFeed` now accepts optional `onLoadMore` and `hasMore` props. The dashboard page passes neither (no pagination). The transfers page will pass both (Task 6).

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```
feat: add inline transaction detail expand and Show more support to ActivityFeed
```

---

### Task 6: Pagination on /transfers page

**Files:**
- Modify: `src/hooks/useTransactionHistory.ts` (accept configurable limit)
- Modify: `src/app/(app)/transfers/page.tsx` (pass pagination props)

**Step 1: Make useTransactionHistory accept a configurable limit with load-more**

Refactor `useTransactionHistory` to accept an options object and support increasing the limit:

```ts
"use client";

import { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { useUserHistory } from "@yo-protocol/react";
import { formatUnits } from "viem";
import { YOEUR_VAULT } from "@/lib/constants";

export type TransactionItem = {
  id: string;
  type: "deposit" | "withdraw";
  label: string;
  amountFloat: number;
  date: Date;
  status: "confirmed";
  txHash: string;
};

const PAGE_SIZE = 20;

export function useTransactionHistory(options?: { paginated?: boolean }) {
  const { address } = useAccount();
  const [limit, setLimit] = useState(PAGE_SIZE);
  const { history, isLoading, isError, refetch } = useUserHistory(YOEUR_VAULT, address, { limit });

  const items: TransactionItem[] = history.map((tx) => {
    const txType = String(tx.type).toLowerCase();
    const isDeposit = txType === "deposit";
    const isWithdraw = txType === "withdrawal" || txType === "redeem_request";
    if (!isDeposit && !isWithdraw) {
      console.warn("[Manna] Unknown transaction type:", tx.type, tx);
    }
    const amount = tx.assets?.formatted
      ? parseFloat(String(tx.assets.formatted))
      : parseFloat(formatUnits(BigInt(tx.assets?.raw ?? "0"), 6));
    return {
      id: tx.transactionHash ?? String(Math.random()),
      type: isDeposit ? "deposit" : "withdraw",
      label: isDeposit ? "Bank Transfer In" : "Bank Transfer Out",
      amountFloat: isDeposit ? amount : -amount,
      date: new Date(tx.blockTimestamp ? tx.blockTimestamp * 1000 : Date.now()),
      status: "confirmed" as const,
      txHash: tx.transactionHash ?? "",
    };
  });

  // hasMore: if we got exactly `limit` items, there might be more
  const hasMore = options?.paginated ? items.length >= limit : false;

  const loadMore = useCallback(() => {
    setLimit((prev) => prev + PAGE_SIZE);
  }, []);

  return { items, isLoading, isError, refetch, hasMore, loadMore };
}
```

**Step 2: Update transfers page to use pagination**

In `src/app/(app)/transfers/page.tsx`, replace the plain `<ActivityFeed />` with one that uses pagination:

```tsx
"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ArrowDownLeft, ArrowUpRight, ChevronRight } from "lucide-react";

const options = [
  {
    href: "/transfers/deposit",
    icon: ArrowDownLeft,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    title: "Deposit funds",
    description: "Transfer EUR from your bank account",
  },
  {
    href: "/transfers/withdraw",
    icon: ArrowUpRight,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Withdraw funds",
    description: "Send EUR back to your bank account",
  },
];

export default function TransfersPage() {
  return (
    <div className="page-enter">
      <PageHeader title="Transfers" />
      <div className="px-4 pt-4 flex flex-col gap-3">
        {options.map(({ href, icon: Icon, iconBg, iconColor, title, description }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 bg-white rounded-xl px-4 py-4 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${iconBg}`}>
              <Icon size={20} className={iconColor} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0d1321]">{title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{description}</p>
            </div>
            <ChevronRight size={17} className="text-gray-300" />
          </Link>
        ))}

        <div className="mt-4 p-4 bg-[#0d1321]/5 rounded-xl">
          <p className="text-xs text-gray-500 leading-relaxed">
            Deposits are allocated to your savings account automatically. Withdrawals are
            transferred to your registered bank account within 1–2 business days.
          </p>
        </div>
      </div>

      <div className="mt-2 pb-6">
        <ActivityFeed paginated />
      </div>
    </div>
  );
}
```

But wait — `ActivityFeed` currently calls `useTransactionHistory()` internally. For pagination to work, the transfers page needs to control the hook. Instead, let's make `ActivityFeed` accept a `paginated` prop and pass it through to the hook internally:

Update `ActivityFeed` signature:
```tsx
export function ActivityFeed({ paginated }: { paginated?: boolean } = {}) {
  const { items, isLoading, isError, refetch, hasMore, loadMore } = useTransactionHistory({ paginated });
  // ... rest unchanged, use hasMore and loadMore for the Show more button
```

And in the render, replace the `onLoadMore`/`hasMore` props pattern with direct usage:
```tsx
{paginated && hasMore && (
  <button
    onClick={loadMore}
    className="w-full py-3 text-sm font-medium text-[#2d9f6f] border-t border-gray-50 active:bg-gray-50 transition-colors"
  >
    Show more
  </button>
)}
```

The transfers page just passes `<ActivityFeed paginated />`. The dashboard passes nothing (no pagination).

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```
feat: add Show more pagination to transfers activity feed
```

---

### Task 7: Cache invalidation after deposit/withdraw

**Files:**
- Modify: `src/hooks/useSimulatedSepa.ts`
- Modify: `src/app/(app)/transfers/withdraw/page.tsx`

**Step 1: Invalidate cache on deposit success**

In `src/hooks/useSimulatedSepa.ts`:

```ts
// Add import:
import { useQueryClient } from "@tanstack/react-query";

// Inside useSimulatedSepa(), add:
const queryClient = useQueryClient();

// In the onConfirmed callback (line 31-33), add invalidation:
onConfirmed: () => {
  queryClient.invalidateQueries();
  setStep("complete");
},
```

**Step 2: Invalidate cache on withdraw success**

In `src/app/(app)/transfers/withdraw/page.tsx`:

```ts
// Add import:
import { useQueryClient } from "@tanstack/react-query";

// Inside WithdrawPage(), add:
const queryClient = useQueryClient();

// In the onConfirmed callback of useRedeem (line 31):
onConfirmed: () => {
  queryClient.invalidateQueries();
  setWStep("complete");
},
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```
feat: invalidate query cache after deposit and withdrawal success
```

---

### Task 8: Logout confirmation modal

**Files:**
- Modify: `src/app/(app)/settings/page.tsx`

**Step 1: Add confirmation state and modal**

In `src/app/(app)/settings/page.tsx`:

```ts
// Add useState for modal:
const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

// Change the Sign out button onClick:
onClick={() => setShowLogoutConfirm(true)}

// Add modal JSX at the end of the component, before the closing </div>:
{showLogoutConfirm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-2xl p-6 mx-6 w-full max-w-sm shadow-xl">
      <h3 className="text-base font-bold text-[#0d1321] text-center">Sign out?</h3>
      <p className="text-sm text-gray-400 text-center mt-2">
        Are you sure you want to sign out of your account?
      </p>
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setShowLogoutConfirm(false)}
          className="flex-1 rounded-xl py-3 text-sm font-semibold text-[#0d1321] bg-gray-100 active:scale-[0.98] transition-transform"
        >
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="flex-1 rounded-xl py-3 text-sm font-semibold text-white bg-red-500 active:scale-[0.98] transition-transform"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
)}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```
feat: add logout confirmation modal to settings page
```

---

### Task 9: Animate main balance with CountUp

**Files:**
- Modify: `src/components/dashboard/BalanceCard.tsx`

**Step 1: Replace static balance with CountUp**

In `src/components/dashboard/BalanceCard.tsx`:

```tsx
// Replace formatEur import with CountUp:
import CountUp from "react-countup";
// Keep formatPercentage import

// Replace the balance display line (line 32):
// FROM:
//   {formatEur(balanceFloat)}
// TO:
<CountUp end={balanceFloat} decimals={2} prefix="€" duration={1} preserveValue />
```

Note: Remove `formatEur` from the import since it's no longer used in this file. Keep `formatPercentage` for the APY display.

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```
feat: animate main balance with CountUp in BalanceCard
```

---

### Task 10: Final verification

**Step 1: Full build check**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Manual smoke test**

Run: `npm run dev` and verify:
- Dashboard: refresh button spins and reloads data
- Dashboard: balance animates on load and refresh
- Dashboard: yield summary still animates
- Dashboard: clicking a transaction expands detail row
- Dashboard: if network is disconnected, error cards appear with retry
- Transfers page: "Show more" button appears if 20+ transactions
- Deposit flow: after success, dashboard shows updated balance
- Withdraw flow: after success, dashboard shows updated balance
- Settings: "Sign out" shows confirmation modal, Cancel dismisses, Sign Out logs out

**Step 3: Final commit (if any cleanup needed)**

```
chore: final cleanup for dashboard improvements
```
