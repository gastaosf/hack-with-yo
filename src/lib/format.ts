import { parseUnits } from "viem";

export function formatEur(value: string | number, decimals: number = 2): string {
  const num =
    typeof value === "string"
      ? parseFloat(value)
      : value;

  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function parseEurAmount(value: string): bigint {
  const clean = value.replace(/[^0-9.]/g, "");
  if (!clean || isNaN(parseFloat(clean))) return BigInt(0);
  return parseUnits(clean, 6);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
