// ─── Manna Design Tokens ────────────────────────────────────────────────────
// Brand: Professional European B2B fintech — Midnight Navy + Emerald Green
// Aesthetic: Wise × Revolut Business × Kast — trusted, modern, effortless

export const colors = {
  // ── Core Brand ────────────────────────────────────────────────────────────
  primary: "#0d1321",       // midnight navy — primary brand, dark surfaces
  accent: "#2d9f6f",        // emerald green — primary CTA, highlights
  accentLight: "#4ec99b",   // mint — hover states, secondary accents
  accentDark: "#1f7a52",    // deep emerald — active/pressed states
  accentSubtle: "#e8f5ef",  // very light mint — tinted backgrounds, badges

  // ── Surfaces ──────────────────────────────────────────────────────────────
  background: "#fafaf5",        // warm off-white — page background
  surface: "#ffffff",           // card / panel background
  surfaceSecondary: "#f4f4ef",  // secondary cards, sidebar, input bg
  surfaceDark: "#111827",       // dark surface (modals, overlays on dark screens)
  surfaceElevated: "#ffffff",   // elevated card with shadow

  // ── Borders ───────────────────────────────────────────────────────────────
  border: "#e4e4dc",       // standard divider / border
  borderSubtle: "#f0f0ea", // very light — table rows, input resting
  borderStrong: "#c8c8be", // emphasized border — active input ring

  // ── Text ──────────────────────────────────────────────────────────────────
  textPrimary: "#0d1321",    // midnight navy — headlines, labels
  textSecondary: "#4b5563",  // warm grey — body, descriptions
  textMuted: "#9ca3af",      // muted — captions, placeholders
  textInverse: "#ffffff",    // white — text on dark backgrounds
  textAccent: "#2d9f6f",     // emerald — highlighted text, links

  // ── Semantic ──────────────────────────────────────────────────────────────
  success: "#2d9f6f",        // emerald — positive states, confirmations
  successBg: "#e8f5ef",      // light emerald — success badge backgrounds
  error: "#e53e3e",          // red — errors, destructive actions
  errorBg: "#fff5f5",        // light red — error message backgrounds
  warning: "#d97706",        // amber — warnings, pending states
  warningBg: "#fffbeb",      // light amber — warning badge backgrounds
  info: "#3b82f6",           // blue — informational states
  infoBg: "#eff6ff",         // light blue — info badge backgrounds

  // ── Special ───────────────────────────────────────────────────────────────
  cardGradientFrom: "#0d1321",  // virtual card gradient start — midnight navy
  cardGradientTo: "#1a2f4a",    // virtual card gradient end — deep slate blue
  overlayLight: "rgba(13, 19, 33, 0.04)",   // light scrim over white surfaces
  overlayDark: "rgba(13, 19, 33, 0.56)",    // dark scrim for modals

  // ── Dark Mode Surfaces (for login + card screen) ───────────────────────────
  darkSurface: "#141c2e",       // slightly lighter than primary — raised card
  darkBorder: "rgba(255,255,255,0.08)",  // subtle border on dark bg
  darkTextSecondary: "rgba(255,255,255,0.60)",  // muted text on dark bg
} as const;

export const gradients = {
  // Virtual card — deep navy to slate, with subtle emerald shimmer
  card: "linear-gradient(135deg, #0d1321 0%, #1a2f4a 60%, #1e3d3d 100%)",

  // Landing page hero — warm off-white fading to subtle tinted white
  hero: "linear-gradient(160deg, #fafaf5 0%, #f0f5f2 50%, #e8f5ef 100%)",

  // Branded gradient for section accents and feature panels
  brand: "linear-gradient(135deg, #2d9f6f 0%, #4ec99b 100%)",

  // Dark hero variant for auth screens
  dark: "linear-gradient(160deg, #0d1321 0%, #111c30 50%, #0f2232 100%)",
} as const;

export const typography = {
  fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
  fontFamilyMono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    xs: "0.75rem",    // 12px — captions, labels
    sm: "0.875rem",   // 14px — secondary text, metadata
    base: "1rem",     // 16px — body text
    lg: "1.125rem",   // 18px — lead text, input labels
    xl: "1.25rem",    // 20px — card titles, nav items
    "2xl": "1.5rem",  // 24px — section subheadings
    "3xl": "1.875rem",// 30px — section headings
    "4xl": "2.25rem", // 36px — page headings
    "5xl": "3rem",    // 48px — hero display text
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  letterSpacings: {
    tight: "-0.02em",
    normal: "0em",
    wide: "0.04em",
    widest: "0.08em",   // uppercase labels, badges
  },
} as const;

// 4px grid spacing system
export const spacing = {
  0.5: "2px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  "2xl": 28,
  "3xl": 40,
  full: 9999,
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(13, 19, 33, 0.06)",
  md: "0 4px 12px -2px rgba(13, 19, 33, 0.10), 0 2px 4px -1px rgba(13, 19, 33, 0.06)",
  lg: "0 10px 32px -4px rgba(13, 19, 33, 0.12), 0 4px 8px -2px rgba(13, 19, 33, 0.06)",
  xl: "0 20px 48px -8px rgba(13, 19, 33, 0.16), 0 8px 16px -4px rgba(13, 19, 33, 0.08)",
  card: "0 2px 8px rgba(13, 19, 33, 0.08), 0 0 1px rgba(13, 19, 33, 0.04)",
  accent: "0 4px 16px -4px rgba(45, 159, 111, 0.40)",  // emerald glow for CTA buttons
} as const;

export const transitions = {
  fast: "150ms ease",
  normal: "250ms ease",
  slow: "400ms ease",
  bounce: "300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

// ── Type exports ─────────────────────────────────────────────────────────────
export type Colors = typeof colors;
export type ColorKey = keyof Colors;
export type Gradients = typeof gradients;
export type GradientKey = keyof Gradients;
