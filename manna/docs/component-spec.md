# Manna — App Component Design Spec

**Design system**: See `tokens.ts` and `globals.css` for all design tokens
**All values reference CSS custom properties from `@theme`**
**Typography**: Outfit (Google Fonts), weights 400/500/600/700
**Grid unit**: 4px

---

## Shared Design Patterns

### Surface Types

| Name | Background | Border | Shadow | Border-radius |
|------|-----------|--------|--------|---------------|
| `surface-card` | `--color-surface` | `border 1px` | `shadow-card` | `radius-xl` (20px) |
| `surface-card-dark` | `--color-dark-surface` | `rgba(255,255,255,0.08) 1px` | none | `radius-xl` |
| `surface-secondary` | `--color-surface-secondary` | none | none | `radius-lg` |

### Button Variants

**Primary**
- Background: `--color-accent` (#2d9f6f)
- Text: white, Outfit 600, 16px
- Padding: 14px 24px
- Border-radius: `radius-full` (pill)
- Height: 52px (large), 44px (default), 36px (small)
- Hover: background `--color-accent-dark`, `translateY(-1px)`, `shadow-accent`
- Active: `translateY(0)`, no shadow
- Disabled: opacity 0.5, cursor-not-allowed
- Loading: spinner replacing text, same dimensions

**Secondary**
- Background: `--color-surface-secondary`
- Text: `--color-text-primary`, Outfit 500
- Border: 1px solid `--color-border`
- Hover: border-color `--color-border-strong`, background white

**Ghost / Outline**
- Background: transparent
- Border: 1px solid `--color-border-strong`
- Text: `--color-text-secondary`
- Hover: border-color `--color-accent`, text `--color-text-accent`

**Destructive**
- Background: `--color-error` on hover, transparent at rest
- Border: 1px solid `--color-error`
- Text: `--color-error`

### Input Fields

- Background: `--color-surface`
- Border: 1px solid `--color-border`
- Border-radius: `radius-md` (10px)
- Padding: 12px 16px
- Font: Outfit 400, 16px, `--color-text-primary`
- Placeholder: `--color-text-muted`
- Focus: border-color `--color-accent`, box-shadow `0 0 0 3px rgba(45,159,111,0.15)`
- Error: border-color `--color-error`, box-shadow `0 0 0 3px rgba(229,62,62,0.12)`
- Label: Outfit 500, 14px, `--color-text-primary`, margin-bottom 6px
- Helper text: 13px, `--color-text-muted`
- Error text: 13px, `--color-error`

### Amount Input (specialized)

- Large font: Outfit 700, 40px, `--color-text-primary`
- Left prefix: "€" — Outfit 400, 32px, `--color-text-muted`
- No visible border at rest; 1px bottom border `--color-border`
- Focus: bottom border `--color-accent`, 2px
- Displays inline formatted value (e.g. "12,500.00")

### Badge / Pill

- Border-radius: `radius-full`
- Padding: 4px 10px
- Font: Outfit 600, 12px, letter-spacing 0.02em

| Variant | Background | Text |
|---------|-----------|------|
| success | `--color-success-bg` | `--color-success` |
| error | `--color-error-bg` | `--color-error` |
| warning | `--color-warning-bg` | `--color-warning` |
| info | `--color-info-bg` | `--color-info` |
| neutral | `--color-surface-secondary` | `--color-text-secondary` |

### List Item (transaction / activity row)

- Height: 64px min
- Horizontal padding: 16px
- Left: 40px icon container (border-radius `radius-md`, bg `--color-surface-secondary`)
- Middle: title (Outfit 500, 15px, `text-primary`) + subtitle (13px, `text-muted`)
- Right: amount (Outfit 600, 15px, tabular-nums) + date (12px, `text-muted`)
- Divider: 1px `border-subtle` between rows (not on last item)
- Hover: background `--color-surface-secondary`, transition 150ms

---

## Screen: Login

**Background**: `gradient-dark` — `linear-gradient(160deg, #0d1321 0%, #111c30 50%, #0f2232 100%)`
**Layout**: full-screen, centered vertically and horizontally
**Max content width**: 380px

### Elements (top to bottom)

1. **Logo** (`/logo-light.svg`)
   - Width: 120px, centered
   - Margin bottom: 48px

2. **Heading**:
   ```
   Sign in to Manna
   ```
   - Outfit 700, 28px, white, centered
   - Margin bottom: 8px

3. **Subheading**:
   ```
   Enter your business email to continue
   ```
   - Outfit 400, 15px, `rgba(255,255,255,0.60)`, centered
   - Margin bottom: 32px

4. **Email input** (full width)
   - Background: `rgba(255,255,255,0.06)`
   - Border: 1px solid `rgba(255,255,255,0.12)`
   - Text: white
   - Placeholder: `rgba(255,255,255,0.40)`
   - Focus: border `--color-accent-light`, box-shadow `0 0 0 3px rgba(78,201,155,0.20)`
   - Border-radius: `radius-md`
   - Padding: 14px 16px

5. **CTA button** (full width, large, margin top: 12px)
   - "Continue with email →"
   - Primary style (emerald)

6. **Divider + note** (margin top: 24px, centered):
   ```
   By continuing, you agree to our Terms of Service and Privacy Policy
   ```
   - 12px, `rgba(255,255,255,0.40)`

7. **OTP / magic link state** (shown after email submitted):
   - Replaces the email input
   - "Check your inbox" heading
   - "We sent a 6-digit code to [email]"
   - 6-cell OTP input (one digit per cell, dark bordered cells)
   - "Resend code" link below (disabled for 30s)

**Transitions**: `animate-slide-up` when screen mounts, 0.35s

---

## Screen: Dashboard

**Background**: `--color-background` (#fafaf5)
**Layout**: Single column, max-width 440px on tablet+, full-width on mobile
**Bottom tab bar**: fixed, 64px height + safe area

### Header

- Height: 56px
- Background: `--color-background`
- Horizontal padding: 20px
- Left: Greeting text
  - "Good morning, Acme GmbH" — Outfit 600, 17px, `text-primary`
  - Date below: "Monday, 15 March" — 13px, `text-muted`
- Right: Settings icon button (24px icon, 40x40 touch target, border-radius `radius-full`, hover `surface-secondary`)

### Balance Card

- Style: `gradient-card` background, border-radius `radius-2xl` (28px), shadow-xl
- Padding: 28px
- Width: calc(100% - 32px), margin: 0 16px

**Inside the card** (all text white or tinted white):

Top row:
- Left: "Treasury Balance" — Outfit 400, 13px, `rgba(255,255,255,0.60)`, letter-spacing 0.04em
- Right: Manna mark icon (small, `rgba(255,255,255,0.20)`)

Balance amount:
- "€ 284,612.00" — Outfit 700, 38px, white, tabular-nums, letter-spacing -0.02em
- Margin top: 8px

Returns badge (margin top: 12px):
- Pill badge: "3.8% Annual Return" — `rgba(45,159,111,0.25)` background, `#4ec99b` text, Outfit 600, 13px
- Padding: 5px 12px, border-radius `radius-full`

Bottom section (margin top: 24px, flex row, space-between):
- Left: "Earnings this month" label (12px, `rgba(255,255,255,0.50)`) + "€ 897.42" value (Outfit 600, 18px, `#4ec99b`)
- Right: "Projected annual" label + "€ 10,815" value (same styles)

Divider: 1px `rgba(255,255,255,0.10)` before bottom section

### Quick Actions

- Margin top: 24px, horizontal padding: 16px
- Flex row, gap: 12px, two equal-width buttons

**"Add Funds" button**:
- Background: `--color-accent`, text white, Outfit 600, 15px
- Left icon: upload/plus arrow
- Border-radius: `radius-xl` (20px)
- Height: 52px

**"Withdraw" button**:
- Background: `--color-surface`, border: 1px solid `--color-border`
- Text: `text-primary`, Outfit 600, 15px
- Left icon: download arrow
- Border-radius: `radius-xl`
- Height: 52px

### Yield Summary Card

- Style: `surface-card`
- Margin: 20px 16px 0
- Padding: 20px
- Title: "Returns Summary" — Outfit 600, 15px, `text-primary`

Two stats in flex row:

| Stat | Label | Value Style |
|------|-------|-------------|
| Realized returns (30d) | "Last 30 days" | Outfit 700, 22px, success color |
| Projected (12m) | "Next 12 months" | Outfit 700, 22px, text-primary |

Below stats: small bar chart (7 bars, last 7 days), bars in `--color-accent-light`, height 32px total. Accessible: `role="img"` with `aria-label="Daily returns for the last 7 days"`

### Activity Feed

- Section header: "Recent Activity" — Outfit 600, 15px, `text-primary` + "View all" link right-aligned, 13px, `text-accent`
- Margin top: 24px, horizontal padding: 16px
- List of transaction rows (see List Item spec above)
- Show 4 most recent items
- Empty state: centered icon + "No activity yet" in `text-muted`

**Transaction row icon colors by type**:
- Bank transfer in: emerald bg (`success-bg`), arrow-down icon (`success`)
- Bank transfer out: light bg, arrow-up icon (`text-secondary`)
- Return accrual: accent-subtle bg, sparkle/star icon (`accent`)

---

## Screen: Transfers Hub

**Background**: `--color-background`
**Layout**: single column, max content width 440px

### Header
- "Transfers" — Outfit 700, 24px, `text-primary`, padding 20px top + 16px bottom

### Balance Overview Card
- `surface-card`, margin: 0 16px, padding: 20px
- "Available Balance" — 13px, `text-muted`
- "€ 284,612.00" — Outfit 700, 32px, `text-primary`, tabular-nums
- Below: small text "Next return accrual in 6 hours" — 13px, accent, left-aligned

### Action Cards

Two full-width cards, margin: 20px 16px 0, gap: 12px between

**"Add Funds via Bank Transfer" card**:
- Background: `--color-accent`, border-radius `radius-xl`
- Padding: 24px
- Icon: bank/upload icon (white, 24px) in `rgba(255,255,255,0.15)` circle
- Title: "Add Funds" — Outfit 700, 18px, white
- Body: "Transfer from your business bank account using SEPA" — 14px, `rgba(255,255,255,0.75)`
- Right: chevron icon (white)
- Tap target: entire card

**"Withdraw to Bank Account" card**:
- Background: `--color-surface`, border: 1px solid `--color-border`, border-radius `radius-xl`
- Padding: 24px
- Icon: arrow-down icon in `success-bg` circle, accent color
- Title: "Withdraw" — Outfit 700, 18px, `text-primary`
- Body: "Send funds back to your registered bank account" — 14px, `text-secondary`
- Right: chevron icon (`text-muted`)

### Recent Transfers

- Section header: "Recent Transfers" + "View all" link (same as Dashboard activity)
- List using List Item spec
- Empty state: "No transfers yet. Add funds to get started." + Primary CTA "Add Funds"

---

## Screen: Deposit Flow (SEPA Simulation)

Multi-step flow. Progress: step indicator at top (3 dots, active = accent filled, inactive = `border`).

### Step 1 — Amount Input

**Header**: Back arrow left + "Add Funds" title center
**Background**: `--color-background`

Content (padding 24px):

1. "How much would you like to add?" — Outfit 600, 18px, `text-primary`
2. Amount input (large, see Amount Input spec above)
   - Below input: "Minimum: no minimum · Maximum: no limit" — 13px, `text-muted`
3. Quick amount chips (flex row, gap 8px, margin top 16px):
   - "€ 5,000" / "€ 10,000" / "€ 50,000" / "€ 100,000"
   - Style: `surface-secondary`, border `border`, border-radius `radius-full`, padding 8px 16px, 14px Outfit 500
   - Active: background `accent-subtle`, border `accent`, text `text-accent`
4. "Continue →" CTA button (full width, large, disabled until amount > 0, margin top 32px)

### Step 2 — SEPA Bank Details

**Header**: Back arrow + "Bank Transfer Details"

Content (padding 24px):

1. Instruction text:
   ```
   Transfer exactly this amount from your business bank account.
   Use the reference code so we can match your payment.
   ```
   - 15px, `text-secondary`, line-height 1.6

2. Details card (`surface-card`, padding 20px, margin top 20px):

   Each row: label (`text-muted`, 12px, letter-spacing) + value (Outfit 600, 15px, `text-primary`) + copy icon

   | Label | Example Value |
   |-------|--------------|
   | BANK NAME | Manna Treasury Bank |
   | IBAN | DE89 3704 0044 0532 0130 00 |
   | BIC / SWIFT | COBADEFFXXX |
   | AMOUNT | € 10,000.00 |
   | REFERENCE | MNR-2026-A7F3 |

   Copy icon: 16px, `text-muted`, hover `text-accent`, shows "Copied!" tooltip for 2s

3. Warning note (margin top 16px, `warning-bg` background, border-left 3px solid `warning`, padding 12px 16px, border-radius `radius-md`):
   ```
   Important: The reference code must be included exactly as shown,
   or we won't be able to match your payment.
   ```
   - 13px, `warning`

4. "I've Sent the Transfer" CTA (full width, large, primary, margin top 32px)
5. Ghost link below: "I'll do this later" — 14px, `text-muted`

### Step 3 — Processing State

**Header**: no back arrow (flow is committed), "Processing Transfer"

Content (centered, padding 48px 24px):

1. Animated icon: emerald circle with rotating arc border (`border-accent`, `border-t-transparent`), 64px, spinning 1s linear infinite
2. "We're watching for your transfer" — Outfit 600, 20px, `text-primary`, margin top 24px, centered
3. Sub-text:
   ```
   Once we receive your payment, your balance will be
   updated and you'll start earning immediately.
   This usually takes 1–2 business days.
   ```
   - 15px, `text-secondary`, centered, max-width 300px

4. Step progress list (margin top 32px):
   - "Transfer sent" — checkmark icon (accent), `text-primary`, Outfit 500
   - "Payment received" — clock icon, `text-muted` (pending)
   - "Balance credited" — clock icon, `text-muted` (pending)

5. "Back to Dashboard" ghost button

### Step 4 — Success Screen

**Background**: full-screen `--color-surface`, centered

1. Large success icon: 80px circle, `success-bg`, check icon (accent, 40px) — with `pulse-accent` animation
2. "Funds received!" — Outfit 700, 28px, `text-primary`, margin top 24px
3. "€ 10,000 has been added to your treasury balance." — 16px, `text-secondary`, centered
4. "You're now earning 3.8% annually on this amount." — 14px, `text-accent`, centered, margin top 8px
5. "Go to Dashboard →" — primary button, margin top 32px
6. "View transfer details" — ghost link below

---

## Screen: Withdraw Flow

### Step 1 — Amount Input

Same layout as Deposit Step 1, but:
- Title: "Withdraw Funds"
- Below amount input: "Available: € 284,612.00" in `text-muted`, 13px
- Amount cannot exceed available balance; if exceeded: error state on input, "Amount exceeds your balance" error text
- Quick chips: "€ 1,000" / "€ 5,000" / "€ 10,000" / "Max"
- "Max" chip sets amount to full balance

### Step 2 — Destination Confirmation

Content (padding 24px):

1. "Sending to your bank account" — Outfit 600, 18px

2. Bank account card (`surface-card`, padding 20px):
   - Bank icon (generic building icon, 40px, `surface-secondary` bg)
   - Bank name: "Deutsche Bank" — Outfit 600, 16px
   - Account: "•••• •••• •••• 4821" — 15px, `text-muted`
   - "Business current account" tag — badge neutral
   - "Change" link (right-aligned, 13px, `text-accent`) — for future: opens modal

3. Summary row: "You will receive: € 10,000.00" — Outfit 600, 16px
4. Timeline note: "Arrives in 1 business day" — 13px, `text-muted`, clock icon

5. "Confirm Withdrawal →" — primary button, full width, margin top 32px

### Step 3 — Processing → Success

Same pattern as Deposit, adapted:
- Processing: "Sending your withdrawal..."
- Steps: "Withdrawal requested" → "Processing" → "Sent to your bank"
- Success: "Withdrawal sent!" + "€ 10,000 is on its way to your bank account. It will arrive within 1 business day."

---

## Screen: Card

**Background**: `--color-background`
**Layout**: single column

### Header
- "Card" — Outfit 700, 24px, padding 20px

### Virtual Card Component

- Width: full-width minus 32px margins, aspect-ratio: 16/9.5 (standard card ratio)
- Background: `gradient-card` — `linear-gradient(135deg, #0d1321 0%, #1a2f4a 60%, #1e3d3d 100%)`
- Border-radius: `radius-2xl` (28px)
- Shadow: `shadow-xl`
- Padding: 24px

**Card content** (all text white):

Top row:
- Left: Small Manna mark (white, 24px)
- Right: Card network icon (Visa / Mastercard placeholder, `rgba(255,255,255,0.60)`)

Middle (margin top: auto):
- Card number: "•••• •••• •••• 4821" — Outfit 500, 20px, letter-spacing 0.12em, `rgba(255,255,255,0.90)`
- Reveal button: eye icon (16px, `rgba(255,255,255,0.50)`), tap to reveal full number
  - When revealed: shows full 16-digit number for 10s, then auto-hides; "Hide" icon replaces eye

Bottom row (margin top: 16px):
- Left: Expiry "VALID THRU" label (10px, `rgba(255,255,255,0.50)`, all caps) + "03/29" value (Outfit 500, 15px, white)
- Right: CVV "CVV" label + "•••" masked, tap to reveal
- Far left: Cardholder name "ACME GMBH" — Outfit 600, 14px, letter-spacing 0.06em, `rgba(255,255,255,0.80)`

**Frozen state**: card image desaturated, overlay `rgba(13,19,33,0.50)`, "Card Frozen" badge centered

### Card Actions (below card, flex row, gap 12px, margin top 20px, padding horizontal 16px)

| Button | Icon | Style |
|--------|------|-------|
| Freeze card | Snowflake | Secondary (white bg, border) |
| Manage limits | Sliders | Secondary |
| Report issue | Flag | Secondary |

Each button: 52px height, flex 1, Outfit 500 14px, icon 18px left-aligned within button

### Transactions Section

- Section header: "Card Transactions" + month filter selector (dropdown or chips: "This month" / "Last month")
- List of transaction rows (see List Item spec)
- Transaction icon: merchant category icon (e.g. coffee, travel, software) in colored circle
- Amount: negative amounts in `text-primary` (spending), show "−€ 47.50"
- Category badge (small, right of merchant name): e.g. "Software" in neutral badge

**Empty state**: "No transactions yet" + "Your card transactions will appear here once you start spending."

---

## Screen: Settings

**Background**: `--color-background`
**Layout**: single column, padded list of sections

### Header
- Back arrow (navigates to Dashboard) + "Settings" title

### Settings Sections

Each section: section title (Outfit 600, 13px, `text-muted`, letter-spacing 0.06em, all caps, padding: 20px 16px 8px) + card containing rows.

**Section card**: `surface-card`, margin: 0 16px, overflow hidden, border-radius `radius-xl`

**Settings row**: height 56px, horizontal padding 16px, flex row align-center
- Left: icon (20px, `text-secondary`) + 12px gap + label (Outfit 500, 15px, `text-primary`)
- Right: value text (14px, `text-muted`) + chevron icon (16px, `text-muted`)
- Hover: `surface-secondary` background
- Divider: 1px `border-subtle` at row bottom (not last row)

### Section 1 — Company

Title: "COMPANY"

Rows:
1. **Company Name** — icon: building — value: "Acme GmbH" — taps to edit (form screen)
2. **Business Registration** — icon: document — value: "HRB 12345" — read-only
3. **VAT Number** — icon: hash — value: "DE123456789" — read-only
4. **Registered Address** — icon: map pin — value: "Berlin, Germany" — taps to view

### Section 2 — Bank Account

Title: "CONNECTED BANK"

Rows:
1. **Bank Account** — icon: bank — value: "Deutsche Bank ••4821" — taps to manage
2. **SEPA Mandate** — icon: file-text — value: "Active" badge (success) — taps to view

### Section 3 — Security

Title: "SECURITY"

Rows:
1. **Email** — icon: envelope — value: "cfo@acme.de" — taps to change
2. **Two-Factor Auth** — icon: shield — value: "Enabled" badge (success) — toggle
3. **Active Sessions** — icon: monitor — value: "2 devices" — taps to view
4. **Download Data** — icon: download — no right value — taps to initiate export

### Section 4 — Preferences

Title: "PREFERENCES"

Rows:
1. **Language** — icon: globe — value: "English (UK)"
2. **Notifications** — icon: bell — toggle switch right-aligned (no chevron)
3. **Statement Frequency** — icon: calendar — value: "Monthly"

### Sign Out

Separate from sections, margin top 24px, margin 0 16px:
- Full-width "Sign Out" button — destructive outline style (border `error`, text `error`)
- Height: 52px
- On tap: confirmation dialog: "Sign out of Manna? Your data will remain secure." + "Sign out" (destructive) / "Cancel" buttons

### Delete Account

Below sign out, centered:
- "Delete account" — 13px, `text-muted`, underline on hover, no button styling
- Tap: full modal with serious warning text and type-to-confirm input

---

## Tab Bar Navigation

**Component**: fixed bottom bar, height 64px + safe-area-inset-bottom
**Background**: `--color-surface`
**Border**: 1px top `--color-border-subtle`
**Box-shadow**: `0 -1px 0 rgba(13,19,33,0.06)`

**Tabs** (4 total, evenly spaced):

| Tab | Icon | Label |
|-----|------|-------|
| Dashboard | Home | "Home" |
| Transfers | ArrowsUpDown | "Transfers" |
| Card | CreditCard | "Card" |
| Settings | Gear | "Settings" |

**Tab item**:
- Flex column, align-center, gap 4px
- Icon: 22px
- Label: 10px, Outfit 500, letter-spacing 0.02em
- Inactive: icon + text `--color-text-muted`
- Active: icon + text `--color-accent`
- Active indicator: 3px wide, 3px tall rounded pill above icon (`--color-accent`)
- Touch target: full height of tab bar

---

## Loading States

### Skeleton Loading

Used when data is fetching. Use `.skeleton` utility class.

**Balance card skeleton**: full card shape, shimmer animation
**List item skeleton**: icon circle + two lines (60% and 40% width)
**Amount skeleton**: rectangle 48px tall, 120px wide

### Spinner

- Size: 24px (inline), 40px (full-screen center)
- Border: 2px solid `--color-border`, border-top-color `--color-accent`
- Animation: spin 0.8s linear infinite
- For buttons: 20px spinner replaces button text, same button dimensions maintained

### Full-Screen Loading

- Background: `--color-background`
- Center: Manna logo mark (`/favicon.svg` or just the mark) 40px + spinner below
- Fade in after 200ms to avoid flash

---

## Empty States

Standard pattern for all empty lists:

- Icon: 48px, `text-muted`, centered
- Title: Outfit 600, 16px, `text-primary`, margin top 12px
- Body: 14px, `text-muted`, max-width 240px, centered
- CTA button (where appropriate): primary, margin top 20px

---

## Error States

### Inline Field Error
- Red border + red error text below field (see Input spec)

### Toast / Snackbar (non-blocking)
- Position: top center, margin top 16px + safe-area
- Background: `--color-primary`
- Text: white, Outfit 500, 14px
- Left: colored dot (green = success, red = error)
- Auto-dismiss after 4s
- Border-radius: `radius-full`
- Shadow: `shadow-lg`
- Animation: slide-down on enter, fade-out on dismiss

### Full-Screen Error
- Centered illustration (SVG icon, `text-muted` tones)
- "Something went wrong" — Outfit 600, 20px
- Helpful description — 15px, `text-secondary`
- "Try again" primary button

---

## Accessibility Checklist for All Screens

- [ ] All interactive elements have `role` and `aria-label` where needed
- [ ] Color is not the only indicator (error states use icon + text + color)
- [ ] Touch targets are at least 44×44px
- [ ] Form fields have associated `<label>` elements
- [ ] Loading states announce to screen readers via `aria-live="polite"`
- [ ] Focus is managed when navigating between screens (focus first interactive element)
- [ ] Masked card numbers use `aria-label="Card number ending in 4821"`
- [ ] Charts have text alternatives via `aria-label` or adjacent description
- [ ] Modals trap focus and restore on close
- [ ] Text remains readable at 200% browser zoom
