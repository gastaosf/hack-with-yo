# Manna — Landing Page Spec

**Target audience**: CFOs, treasurers, finance teams at European SMBs
**Goal**: Convert visitors to "Get started" signups
**Tone**: Professional, trustworthy, modern — not DeFi, not a bank startup

---

## Page Structure Overview

```
[Navbar]
[Hero]
[Trust Bar]
[Features]
[How It Works]
[Security & Trust]
[Final CTA]
[Footer]
```

---

## 1. Navbar

**Layout**: Fixed top, full-width, white background, 1px bottom border (`#e4e4dc`)
**Height**: 64px desktop / 56px mobile
**Max content width**: 1200px, centered

**Left**: Logo (`/logo.svg`) — 32px tall, links to `/`
**Center** (desktop only): Nav links — "Product", "Security", "Pricing", "Company"
**Right**:
  - "Sign in" — ghost link, `text-text-secondary`, hover `text-text-primary`
  - "Get started" — primary button, emerald, small

**Mobile**: Hamburger icon replaces center nav. Slide-down drawer with full nav links stacked vertically.

**Scroll behavior**: Adds `box-shadow: shadow-md` after scrolling 20px.

---

## 2. Hero Section

**Background**: `gradient-hero` — `linear-gradient(160deg, #fafaf5 0%, #f0f5f2 50%, #e8f5ef 100%)`
**Layout**: 2-column on desktop (text left, visual right), 1-column stacked on mobile
**Vertical padding**: 96px top / 80px bottom desktop; 64px top / 48px bottom mobile

### Left column — Copy

**Eyebrow label** (above headline):
```
TREASURY MANAGEMENT
```
- Font: Outfit 500, 13px, letter-spacing 0.08em, all caps
- Color: `text-accent` (#2d9f6f)
- Margin bottom: 16px

**Headline** (h1):
```
Put your idle treasury
cash to work
```
- Font: Outfit 700, 56px desktop / 40px mobile
- Letter-spacing: -0.02em
- Color: `text-primary` (#0d1321)
- Line height: 1.15

**Subheadline** (p):
```
Manna lets European companies earn up to 3.8% annual return
on unused cash — via standard SEPA bank transfer, in minutes.
No complexity, no lock-up, no surprises.
```
- Font: Outfit 400, 18px desktop / 16px mobile
- Color: `text-secondary` (#4b5563)
- Line height: 1.6
- Max width: 480px
- Margin top: 20px

**CTA group** (margin top: 32px, flex row gap-3):
- Primary CTA: "Start earning — it's free" — large emerald button (see Button spec)
- Secondary: "See how it works" — ghost/link with down-arrow icon, `text-text-secondary`

**Trust note** (below CTAs, margin top: 16px):
```
SEPA bank transfer  ·  No minimum  ·  Withdraw anytime
```
- Font: 13px, color: `text-muted`, centered on mobile

### Right column — Visual

A mock dashboard card showing:
- Dark card (`gradient-card`), border-radius 24px, shadow-xl
- Inside: Balance label "Treasury Balance", large EUR amount "€ 284,612.00" in white Outfit 700
- Below: "Annual Return" badge — emerald pill badge "3.8%"
- Below: "Earning since" label + small line chart or bar chart in mint (#4ec99b)
- Bottom strip: "Your cash earns while you sleep" in muted white

This should be an actual rendered component (not a screenshot), so the Frontend dev can use real Tailwind classes.

**Mobile**: Hero card stacks below text, reduced to 80% width, centered.

---

## 3. Trust Bar

**Background**: white (`color-surface`)
**Border**: 1px top + bottom `border-subtle`
**Padding**: 32px vertical, full-width
**Layout**: centered container, flex row, gap-8, wrap on mobile

**Label** (leftmost, desktop only):
```
Trusted by finance teams across Europe
```
- 13px, `text-muted`, `letter-spacing: 0.04em`, all caps

**Items** — display as text with subtle styling (avoid fake logos — use name + description):

| Company | Description |
|---------|-------------|
| Lumis GmbH | Berlin · SaaS |
| Arken BV | Amsterdam · E-commerce |
| Solvera SRL | Milan · Manufacturing |
| Calder SA | Paris · Consulting |
| Nexway OÜ | Tallinn · FinTech |

Each item: Company name in `font-weight: 600`, 14px, `text-primary`; description in `text-muted`, 12px. Separated by `·` dividers on desktop.

**Mobile**: 2-column grid of company names, no descriptions.

---

## 4. Features Section

**Background**: `color-background` (#fafaf5)
**Padding**: 96px vertical desktop / 64px mobile
**Max width**: 1200px, centered

**Section label** (centered above):
```
WHY FINANCE TEAMS CHOOSE MANNA
```
- 12px, accent color, letter-spacing 0.08em, all caps

**Section heading** (h2, centered):
```
Everything your treasury needs.
Nothing it doesn't.
```
- Outfit 700, 40px desktop / 32px mobile, tracking-tight, `text-primary`

**Feature cards grid**: 3-column on desktop, 1-column on mobile
**Card style**: white surface, border `border`, border-radius `radius-xl`, shadow-card, padding 32px
**Card hover**: `translateY(-3px)`, shadow-lg, transition 250ms

### Feature 1 — Annual Returns

**Icon**: Rising arrow inside a soft emerald circle (32px icon, 56px container, `accent-subtle` background)

**Title**:
```
Up to 3.8% annual return
```
- Outfit 600, 20px, `text-primary`

**Description**:
```
Your idle treasury earns a competitive annual return — automatically,
every day. No action needed after your initial transfer.
```
- 15px, `text-secondary`, line-height 1.6

**Footnote**: "Returns shown are variable and may change." — 12px, `text-muted`

### Feature 2 — SEPA Bank Transfer

**Icon**: Bank/institution icon, navy blue circle bg

**Title**:
```
Standard SEPA bank transfer
```

**Description**:
```
Fund your account just like you would any bank transfer.
Provide your accountant with an IBAN and reference — that's it.
No new banking relationship, no credit card required.
```

### Feature 3 — Withdraw Anytime

**Icon**: Circular arrows icon, soft navy circle bg

**Title**:
```
No lock-up. Withdraw anytime.
```

**Description**:
```
Your funds are never locked. Request a withdrawal and receive
your full balance — including returns — in your business account
within one business day.
```

---

## 5. How It Works

**Background**: white (`color-surface`)
**Padding**: 96px vertical desktop / 64px mobile
**Layout**: section label + heading centered at top; below: 3-step row on desktop, stacked on mobile

**Section label**: "GETTING STARTED" — 12px, accent, all caps, tracking-widest
**Heading** (h2):
```
Earning returns in three steps
```
- Outfit 700, 40px desktop / 32px mobile

**Steps** — horizontal flow with connecting dashed line on desktop:

### Step 1 — Create your account

**Number**: Large "01" in accent color (56px, Outfit 700)
**Title**: "Create your company account"
**Description**:
```
Sign up with your business email. We verify your company
in minutes — no lengthy onboarding paperwork.
```
**Icon/visual**: Envelope with checkmark

### Step 2 — Transfer from your bank

**Number**: "02"
**Title**: "Send a SEPA bank transfer"
**Description**:
```
We give you a unique IBAN and payment reference.
Transfer any amount from your business bank account —
just like a normal supplier payment.
```
**Icon/visual**: Bank building with arrow

### Step 3 — Watch your returns grow

**Number**: "03"
**Title**: "Earn returns from day one"
**Description**:
```
Your balance starts earning immediately. View your daily
accrual, request withdrawals, and manage your treasury
from your dashboard.
```
**Icon/visual**: Bar chart trending up in emerald

**Connecting element**: On desktop, a dashed horizontal line (`border-border`, `border-dashed`, opacity 0.5) connects the three steps below the numbers. Hidden on mobile.

**Bottom CTA** (centered, margin top: 48px):
```
[Get started — it's free →]
```

---

## 6. Security and Trust Section

**Background**: `color-primary` (#0d1321) — dark section
**Text color**: white / `text-inverse`
**Padding**: 96px vertical desktop / 64px mobile
**Layout**: 2-column — left text block, right 2x2 trust card grid

### Left block

**Label**: "SECURITY & COMPLIANCE" — 12px, `text-accent-light`, all caps, letter-spacing
**Heading** (h2):
```
Bank-grade security.
Built for business.
```
- Outfit 700, 40px desktop / 32px mobile, white

**Body**:
```
Manna is designed to meet the compliance and security standards
European finance teams expect. Your funds are held with regulated
custodians and your data is protected under EU law.
```
- 16px, `rgba(255,255,255,0.72)`, line-height 1.65

**CTA**: "Read our security overview →" — emerald text link, 15px

### Right block — 2×2 Trust Cards

Each trust card: dark surface `#141c2e`, border `rgba(255,255,255,0.08)`, border-radius `radius-lg`, padding 24px

**Card 1 — Regulated Custodian**
- Icon: Shield with checkmark (emerald)
- Title: "Regulated custodian"
- Body: "Your funds are held with EU-regulated financial institutions, separate from Manna's operating accounts."

**Card 2 — EU Data Protection**
- Icon: EU flag / lock icon (emerald)
- Title: "GDPR compliant"
- Body: "All data is processed and stored in the EU. We never sell your data."

**Card 3 — Encrypted Transfers**
- Icon: Lock icon (emerald)
- Title: "Bank-level encryption"
- Body: "256-bit encryption in transit and at rest. SOC 2 Type II audit in progress."

**Card 4 — Instant Withdrawal**
- Icon: Clock / checkmark (emerald)
- Title: "No lock-up period"
- Body: "Request a withdrawal at any time. Funds arrive in your business bank account within one business day."

**Mobile**: 2-column grid for trust cards; heading and body stack above.

---

## 7. Final CTA Section

**Background**: `gradient-hero`
**Padding**: 96px vertical desktop / 72px mobile
**Layout**: centered, max-width 680px, text-center

**Heading** (h2):
```
Your idle cash could be earning 3.8% today
```
- Outfit 700, 44px desktop / 32px mobile, `text-primary`, tracking-tight

**Subheading**:
```
Join 500+ European finance teams already using Manna.
No lengthy onboarding. No crypto. Just returns.
```
- 18px, `text-secondary`, line-height 1.6, margin-top 16px

**CTA Button**: "Get started — it's free" — large, full-width on mobile, auto on desktop, emerald, shadow-accent

**Under button** (margin top: 12px):
```
Free to create an account  ·  No minimum balance  ·  Cancel anytime
```
- 13px, `text-muted`

---

## 8. Footer

**Background**: `color-primary` (#0d1321)
**Text color**: `rgba(255,255,255,0.60)` default, white for headings/links on hover
**Padding**: 64px top / 48px bottom
**Border top**: none (relies on dark background contrast from CTA section)

**Layout**: 4-column on desktop, 2-column on tablet, 1-column on mobile

**Column 1 — Brand**
- Logo (light version `/logo-light.svg`)
- Tagline: "Treasury management for European companies."
- 14px, `rgba(255,255,255,0.50)`
- Social: LinkedIn icon link only

**Column 2 — Product**
- Heading: "Product" (white, 13px, semibold, all caps, letter-spacing)
- Links: Dashboard, Transfers, Virtual Card, Security

**Column 3 — Company**
- Heading: "Company"
- Links: About, Blog, Careers, Press

**Column 4 — Legal**
- Heading: "Legal"
- Links: Privacy Policy, Terms of Service, Cookie Policy, Regulatory Disclosures

**Bottom strip** (border top `rgba(255,255,255,0.10)`, margin top 48px, padding top 24px):
- Left: "© 2026 Manna Technologies SAS. All rights reserved."
- Right: "Regulated activity carried out by our licensed partners."
- Both: 12px, `rgba(255,255,255,0.40)`
- Mobile: stacked, centered

---

## Design Notes for Implementation

### Button Variants

**Primary (large)**:
- Background: `accent` (#2d9f6f)
- Text: white, Outfit 600, 16px
- Padding: 14px 28px
- Border-radius: `radius-full` (pill shape)
- Hover: `accent-dark` (#1f7a52), `translateY(-1px)`, `shadow-accent`
- Active: `translateY(0)`, shadow removed
- Transition: 150ms ease

**Ghost**:
- Background: transparent
- Border: 1px solid `border-strong`
- Text: `text-secondary`
- Hover: border `accent`, text `text-accent`

### Typography Hierarchy on Landing Page

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 (hero) | 56px / 40px | 700 | primary |
| H2 (section) | 40px / 32px | 700 | primary |
| Body lead | 18px | 400 | secondary |
| Body | 15-16px | 400 | secondary |
| Caption/label | 12-13px | 500 | muted / accent |
| All-caps label | 12px | 500 | accent, tracking-widest |

### Responsive Breakpoints

- Mobile: < 640px — single column, full-width
- Tablet: 640–1023px — 2-column where applicable
- Desktop: 1024px+ — full multi-column layout, max-width 1200px

### Accessibility Requirements

- All interactive elements keyboard-navigable with visible focus ring (2px solid accent, offset 2px)
- Color contrast: all body text ≥ 4.5:1 against backgrounds (WCAG AA)
- Hero card visual has `aria-hidden="true"` (decorative)
- Nav has `role="navigation"` with `aria-label="Main navigation"`
- Footer nav has `aria-label="Footer navigation"`
- Touch targets minimum 44px × 44px
