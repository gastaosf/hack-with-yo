import { parseUnits } from "viem";
export function formatEur(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
}
export function parseEurAmount(value: string): bigint {
  const clean = value.replace(/[^0-9.]/g, "");
  if (!clean || isNaN(parseFloat(clean))) return BigInt(0);
  return parseUnits(clean, 6);
}
export function formatEurCompact(value: number): string {
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `€${(value / 1_000).toFixed(1)}K`;
  return formatEur(value);
}
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
