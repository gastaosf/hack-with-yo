'use client';
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
  useSimulatedSepa,
  SEPA_DETAILS,
  formatEur,
} from "@manna/shared";

export default function DepositScreen() {
  const [inputAmount, setInputAmount] = useState("");
  const { step, startDeposit, confirmTransferSent, reset, error } =
    useSimulatedSepa();
  const numAmount = parseFloat(inputAmount) || 0;

  // ─── Success state ────────────────────────────────────────────────────────

  if (step === "complete") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={styles.fullCenter}>
          <View style={styles.successIcon}>
            <Text style={{ fontSize: 32, color: "#2d9f6f" }}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Funds received!</Text>
          <Text style={styles.successBody}>
            {numAmount > 0 ? formatEur(numAmount) : "Your funds"} has been
            added to your treasury balance.
          </Text>
          <Text style={styles.successNote}>
            You're now earning annual returns on this amount.
          </Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => {
              reset();
              router.replace("/(app)/dashboard");
            }}
          >
            <Text style={styles.primaryBtnText}>Go to Dashboard →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Processing state ─────────────────────────────────────────────────────

  if (
    step === "verifying" ||
    step === "received" ||
    step === "depositing"
  ) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fafaf5" }}>
        <View style={styles.fullCenter}>
          <View style={styles.spinner} />
          <Text style={styles.processingTitle}>Processing Transfer</Text>
          <Text style={styles.processingBody}>
            Once we receive your payment, your balance will be updated
            immediately.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const showingDetails =
    step === "showing_details" || step === "awaiting_transfer";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafaf5" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (showingDetails) reset();
            else router.back();
          }}
          style={styles.backBtn}
        >
          <Text style={{ fontSize: 24, color: "#0d1321" }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {showingDetails ? "Bank Transfer Details" : "Add Funds"}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
      >
        {!showingDetails ? (
          <>
            <Text style={styles.stepTitle}>
              How much would you like to add?
            </Text>

            {/* Amount input */}
            <View style={styles.amountContainer}>
              <Text style={styles.eurSign}>€</Text>
              <TextInput
                style={styles.amountInput}
                value={inputAmount}
                onChangeText={(v) => setInputAmount(v.replace(/[^0-9.]/g, ""))}
                placeholder="0"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
              />
            </View>

            {/* Quick amounts */}
            <View style={styles.quickAmounts}>
              {[5000, 10000, 50000, 100000].map((amt) => (
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
            </View>
          </>
        ) : (
          <>
            <Text style={styles.detailsBody}>
              Transfer exactly this amount from your business bank account. Use
              the reference code so we can match your payment.
            </Text>

            <View style={styles.detailsCard}>
              {[
                { label: "BANK NAME", value: SEPA_DETAILS.recipient },
                { label: "IBAN", value: SEPA_DETAILS.iban },
                { label: "BIC / SWIFT", value: SEPA_DETAILS.bic },
                { label: "AMOUNT", value: formatEur(numAmount) },
                { label: "REFERENCE", value: "MNR-2026-A7F3" },
              ].map(({ label, value }, i, arr) => (
                <View
                  key={label}
                  style={[
                    styles.detailRow,
                    i < arr.length - 1 && styles.detailBorder,
                  ]}
                >
                  <Text style={styles.detailLabel}>{label}</Text>
                  <Text style={styles.detailValue}>{value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                Include the reference code exactly as shown so we can match your
                payment.
              </Text>
            </View>

            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        {!showingDetails ? (
          <TouchableOpacity
            style={[styles.primaryBtn, numAmount <= 0 && styles.btnDisabled]}
            onPress={() => startDeposit(inputAmount)}
            disabled={numAmount <= 0}
          >
            <Text style={styles.primaryBtnText}>Continue →</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={confirmTransferSent}
            >
              <Text style={styles.primaryBtnText}>
                I've Sent the Transfer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", paddingVertical: 12 }}
              onPress={reset}
            >
              <Text style={{ fontSize: 14, color: "#9ca3af" }}>
                I'll do this later
              </Text>
            </TouchableOpacity>
          </>
        )}
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
  eurSign: { fontSize: 32, color: "#9ca3af" },
  amountInput: { flex: 1, fontSize: 40, fontWeight: "700", color: "#0d1321" },

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

  detailsBody: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 20,
  },
  detailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e4e4dc",
    overflow: "hidden",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  detailBorder: { borderBottomWidth: 1, borderBottomColor: "#f0f0ea" },
  detailLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#9ca3af",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0d1321",
    flex: 1,
    textAlign: "right",
  },

  warningBox: {
    marginTop: 16,
    backgroundColor: "#fffbeb",
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#d97706",
  },
  warningText: { fontSize: 13, color: "#d97706", lineHeight: 19 },
  errorBox: {
    marginTop: 12,
    backgroundColor: "#fff5f5",
    borderRadius: 14,
    padding: 16,
  },
  errorText: { fontSize: 13, color: "#e53e3e" },

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
    marginBottom: 8,
  },
  successNote: {
    fontSize: 14,
    color: "#2d9f6f",
    textAlign: "center",
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
    marginBottom: 12,
    textAlign: "center",
  },
  processingBody: {
    fontSize: 15,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
  },
});
