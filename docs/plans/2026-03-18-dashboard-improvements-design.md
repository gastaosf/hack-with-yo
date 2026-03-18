# Dashboard & UX Improvements — Design

## Context

Manna is a B2B euro savings app for the "Hack with YO" hackathon (deadline March 19, 2026). The core product works well but has functional gaps that reduce trust and usability. These 7 improvements address the most impactful ones without touching styling.

## Improvements

### 1. Pull-to-refresh on Dashboard

**What:** Add a refresh button (rotate icon) in `DashboardHeader`, next to the notification bell.

**Behavior:**
- On tap: `queryClient.invalidateQueries()` to refetch all data
- Button spins briefly during refetch
- No native pull-to-refresh gesture (unreliable in PWAs)

**Files:** `src/components/dashboard/DashboardHeader.tsx`

### 2. Transaction Detail — Inline Expand

**What:** Make activity feed rows tappable to expand inline and show additional details.

**Expanded details:** Full date/time, status ("Confirmed"), truncated tx hash as reference ID, type label.

**Behavior:**
- Chevron icon indicates expandability
- Animated expand/collapse (`max-height` + overflow transition)
- Only one row expanded at a time

**Files:** `src/components/dashboard/ActivityFeed.tsx`, `src/hooks/useTransactionHistory.ts` (expose txHash + timestamp in TransactionItem)

### 3. Pagination on /transfers Page

**What:** Add "Show more" button at bottom of activity feed on `/transfers` only.

**Behavior:**
- Initial load: 20 items (current)
- "Show more" fetches next 20 using `nextCursor` from API
- Button hidden when no more items (`nextCursor === null`)
- Dashboard keeps static last-20 view (no pagination)

**Files:** `src/hooks/useTransactionHistory.ts` (add cursor-based pagination), `src/app/(app)/transfers/page.tsx` (render Show more button), `src/components/dashboard/ActivityFeed.tsx` (accept optional `onLoadMore` + `hasMore` props)

### 4. Balance Invalidation After Deposit/Withdraw

**What:** After successful deposit or withdrawal, invalidate React Query caches so dashboard reflects the new balance immediately.

**Behavior:**
- On deposit success (`onConfirmed` callback in `useSimulatedSepa`): invalidate `yo-vault-snapshot`, `yo-user-performance`, and `useUserPosition` query keys
- On withdraw success: same invalidation
- User sees updated balance when navigating back to dashboard

**Files:** `src/hooks/useSimulatedSepa.ts`, `src/app/(app)/transfers/withdraw/page.tsx`

### 5. Logout Confirmation

**What:** Show a confirmation modal before signing out.

**Behavior:**
- Tap "Sign out" → modal appears: "Are you sure you want to sign out?"
- Two buttons: "Cancel" (dismisses) and "Sign Out" (calls `logout()`, redirects to `/login`)
- Overlay backdrop, centered card, consistent with app styling

**Files:** `src/app/(app)/settings/page.tsx`

### 6. Error States on Data Fetch Failures

**What:** Add an `ErrorCard` component shown when data queries fail.

**Design:** Icon + "Something went wrong" message + "Tap to retry" button.

**Where used:**
- `BalanceCard` — when balance query errors
- `YieldSummary` — when yield stats query errors
- `ActivityFeed` — when transaction history query errors

**Behavior:** Retry button calls `refetch()` on the failed query.

**Files:** New `src/components/shared/ErrorCard.tsx`, modifications to `BalanceCard.tsx`, `YieldSummary.tsx`, `ActivityFeed.tsx`, and their hooks (expose `isError` + `refetch`)

### 7. Animate Main Balance with CountUp

**What:** Wrap the EUR balance in `BalanceCard` with `<CountUp>` component.

**Props:** `preserveValue`, `decimals={2}`, `prefix="€"`, `duration={1}` — same pattern as YieldSummary.

**Files:** `src/components/dashboard/BalanceCard.tsx`
