import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  useEurBalance,
  LINKED_BANK,
  YOEUR_VAULT,
  formatEur,
} from "@manna/shared";
import { useRedeem } from "@yo-protocol/react";

type Step = "idle" | "confirm" | "processing" | "success" | "error";

export default function WithdrawScreen() {
  const [inputAmount, setInputAmount] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState<string | null>(null);
  const { balanceFloat, sharesRaw } = useEurBalance();

  const { redeem } = useRedeem({
    vault: YOEUR_VAULT,
    onSubmitted: () => setStep("processing"),
    onConfirmed: () => setStep("success"),
    onError: (err: Error) => {
      setError(err.message);
      setStep("error");
    },
  });

  const numAmount = parseFloat(inputAmount) || 0;
  const isOverBalance = numAmount > balanceFloat;

  const handleConfirm = async () => {
    setStep("processing");
    try {
      const fraction = numAmount / Math.max(balanceFloat, 0.000001);
      const sharesToRedeem = BigInt(Math.floor(Number(sharesRaw) * fraction));
      await redeem(sharesToRedeem);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Withdrawal failed");
      setStep("error");
    }
  };

  // ─── Success state ────────────────────────────────────────────────────────

  if (step === "success") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={styles.fullCenter}>
          <View style={styles.successIcon}>
            <Text style={{ fontSize: 32, color: "#2d9f6f" }}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Withdrawal sent!</Text>
          <Text style={styles.successBody}>
            {formatEur(numAmount)} is on its way to your bank account. It will
            arrive within 1 business day.
          </Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.replace("/(app)/dashboard")}
          >
            <Text style={styles.primaryBtnText}>Go to Dashboard →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Processing state ─────────────────────────────────────────────────────

  if (step === "processing") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fafaf5" }}>
        <View style={styles.fullCenter}>
          <View style={styles.spinner} />
          <Text style={styles.processingTitle}>Processing withdrawal...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafaf5" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            step === "confirm" ? setStep("idle") : router.back()
          }
          style={styles.backBtn}
        >
          <Text style={{ fontSize: 24, color: "#0d1321" }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdraw Funds</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
      >
        {step === "idle" ? (
          <>
            <Text style={styles.stepTitle}>
              How much would you like to withdraw?
            </Text>

            <View
              style={[
                styles.amountContainer,
                isOverBalance && styles.amountError,
              ]}
            >
              <Text style={styles.eurSign}>€</Text>
              <TextInput
                style={styles.amountInput}
                value={inputAmount}
                onChangeText={(v) =>
                  setInputAmount(v.replace(/[^0-9.]/g, ""))
                }
                placeholder="0"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
              />
            </View>

            {isOverBalance && (
              <Text style={styles.errorInline}>
                Amount exceeds your available balance
              </Text>
            )}
            <Text style={styles.availableText}>
              Available: {formatEur(balanceFloat)}
            </Text>

            <View style={styles.quickAmounts}>
              {[1000, 5000, 10000].map((amt) => (
                <TouchableOpacity
                  key={amt}
                  style={[
                    styles.quickChip,
                    parseFloat(inputAmount) === amt && styles.quickChipActive,
                  ]}
                  onPress={() => setInputAmount(String(amt))}
                >
                  <Text
                    style={[
                      styles.quickChipText,
                      parseFloat(inputAmount) === amt &&
                        styles.quickChipTextActive,
                    ]}
                  >
                    €{(amt / 1000).toFixed(0)}K
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[
                  styles.quickChip,
                  parseFloat(inputAmount) === balanceFloat &&
                    styles.quickChipActive,
                ]}
                onPress={() =>
                  setInputAmount(String(Math.floor(balanceFloat)))
                }
              >
                <Text
                  style={[
                    styles.quickChipText,
                    parseFloat(inputAmount) === balanceFloat &&
                      styles.quickChipTextActive,
                  ]}
                >
                  Max
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.stepTitle}>
              Sending to your bank account
            </Text>

            <View style={styles.bankCard}>
              <View style={styles.bankIcon}>
                <Text style={{ fontSize: 22 }}>🏦</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bankName}>{LINKED_BANK.bank}</Text>
                <Text style={styles.bankAccount}>
                  •••• •••• •••• {LINKED_BANK.lastFour}
                </Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>You will receive</Text>
              <Text style={styles.summaryValue}>{formatEur(numAmount)}</Text>
            </View>
            <Text style={styles.arrivalNote}>Arrives in 1 business day</Text>

            {step === "error" && error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorBoxText}>{error}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            (numAmount <= 0 || isOverBalance) && styles.btnDisabled,
          ]}
          disabled={numAmount <= 0 || isOverBalance}
          onPress={() =>
            step === "idle" ? setStep("confirm") : handleConfirm()
          }
        >
          <Text style={styles.primaryBtnText}>
            {step === "idle" ? "Continue →" : "Confirm Withdrawal →"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#0d1321" },
  stepTitle: { fontSize: 18, fontWeight: "600", color: "#0d1321", marginBottom: 24 },

  amountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    borderBottomWidth: 2,
    borderBottomColor: "#e4e4dc",
    paddingBottom: 12,
    gap: 8,
  },
  amountError: { borderBottomColor: "#e53e3e" },
  eurSign: { fontSize: 32, color: "#9ca3af" },
  amountInput: { flex: 1, fontSize: 40, fontWeight: "700", color: "#0d1321" },
  errorInline: { fontSize: 13, color: "#e53e3e", marginTop: 6 },
  availableText: { fontSize: 13, color: "#9ca3af", marginTop: 6 },

  quickAmounts: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    flexWrap: "wrap",
  },
  quickChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e4e4dc",
    backgroundColor: "#f4f4ef",
  },
  quickChipActive: { borderColor: "#2d9f6f", backgroundColor: "#e8f5ef" },
  quickChipText: { fontSize: 14, fontWeight: "500", color: "#4b5563" },
  quickChipTextActive: { color: "#2d9f6f" },

  bankCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e4e4dc",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  bankIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f4f4ef",
    alignItems: "center",
    justifyContent: "center",
  },
  bankName: { fontSize: 16, fontWeight: "600", color: "#0d1321" },
  bankAccount: { fontSize: 14, color: "#9ca3af", marginTop: 2 },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0ea",
  },
  summaryLabel: { fontSize: 15, color: "#4b5563" },
  summaryValue: { fontSize: 16, fontWeight: "600", color: "#0d1321" },
  arrivalNote: { fontSize: 13, color: "#9ca3af", marginTop: 6 },
  errorBox: {
    marginTop: 12,
    backgroundColor: "#fff5f5",
    borderRadius: 14,
    padding: 16,
  },
  errorBoxText: { fontSize: 13, color: "#e53e3e" },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fafaf5",
    borderTopWidth: 1,
    borderTopColor: "#e4e4dc",
  },
  primaryBtn: {
    backgroundColor: "#2d9f6f",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.5 },
  primaryBtnText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },

  fullCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e8f5ef",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0d1321",
    marginBottom: 12,
    textAlign: "center",
  },
  successBody: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 280,
    marginBottom: 32,
  },
  spinner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: "#e4e4dc",
    borderTopColor: "#2d9f6f",
    marginBottom: 24,
  },
  processingTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0d1321",
    textAlign: "center",
  },
});
