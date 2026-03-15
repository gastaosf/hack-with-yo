'use client';
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  useEurBalance,
  useTransactionHistory,
  formatEur,
} from "@manna/shared";

export default function TransfersScreen() {
  const { balanceFloat } = useEurBalance();
  const { items } = useTransactionHistory();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafaf5" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>Transfers</Text>
        </View>

        {/* Balance summary */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>{formatEur(balanceFloat)}</Text>
          <Text style={styles.earningNote}>Earning daily returns</Text>
        </View>

        {/* Action cards */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.addFundsCard}
            onPress={() => router.push("/(app)/transfers/deposit")}
            activeOpacity={0.85}
          >
            <View style={styles.actionIcon}>
              <Text style={{ fontSize: 22, color: "white" }}>↓</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.addFundsTitle}>Add Funds</Text>
              <Text style={styles.addFundsBody}>
                Transfer from your business bank account using SEPA
              </Text>
            </View>
            <Text style={{ color: "rgba(255,255,255,0.60)", fontSize: 18 }}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.withdrawCard}
            onPress={() => router.push("/(app)/transfers/withdraw")}
            activeOpacity={0.85}
          >
            <View style={styles.withdrawIcon}>
              <Text style={{ fontSize: 22, color: "#2d9f6f" }}>↑</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.withdrawTitle}>Withdraw</Text>
              <Text style={styles.withdrawBody}>
                Send funds back to your registered bank account
              </Text>
            </View>
            <Text style={{ color: "#9ca3af", fontSize: 18 }}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Recent transfers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transfers</Text>
          <View style={styles.card}>
            {items.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No transfers yet</Text>
                <Text style={styles.emptyBody}>Add funds to get started</Text>
              </View>
            ) : (
              items.slice(0, 10).map((item, i, arr) => (
                <View
                  key={item.id}
                  style={[
                    styles.txRow,
                    i < arr.length - 1 && styles.txBorder,
                  ]}
                >
                  <View
                    style={[
                      styles.txIcon,
                      {
                        backgroundColor:
                          item.type === "deposit" ? "#e8f5ef" : "#f4f4ef",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 14 }}>
                      {item.type === "deposit" ? "↓" : "↑"}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.txLabel}>{item.label}</Text>
                    <Text style={styles.txDate}>
                      {item.date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.txAmount,
                      {
                        color:
                          item.amountFloat > 0 ? "#2d9f6f" : "#0d1321",
                      },
                    ]}
                  >
                    {item.amountFloat > 0 ? "+" : ""}
                    {formatEur(Math.abs(item.amountFloat))}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleRow: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: "700", color: "#0d1321" },

  balanceCard: {
    marginHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e4e4dc",
    padding: 20,
    shadowColor: "#0d1321",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceLabel: { fontSize: 13, color: "#9ca3af", marginBottom: 4 },
  balanceAmount: { fontSize: 32, fontWeight: "700", color: "#0d1321" },
  earningNote: { fontSize: 13, color: "#2d9f6f", marginTop: 6 },

  actions: { marginHorizontal: 16, marginTop: 16, gap: 12 },
  addFundsCard: {
    backgroundColor: "#2d9f6f",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  addFundsTitle: { fontSize: 18, fontWeight: "700", color: "#ffffff" },
  addFundsBody: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
    lineHeight: 20,
  },
  withdrawCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e4e4dc",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#0d1321",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  withdrawIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e8f5ef",
    alignItems: "center",
    justifyContent: "center",
  },
  withdrawTitle: { fontSize: 18, fontWeight: "700", color: "#0d1321" },
  withdrawBody: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 2,
    lineHeight: 20,
  },

  section: { marginHorizontal: 16, marginTop: 24 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0d1321",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e4e4dc",
    overflow: "hidden",
    shadowColor: "#0d1321",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
  },
  txBorder: { borderBottomWidth: 1, borderBottomColor: "#f0f0ea" },
  txIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  txLabel: { fontSize: 15, fontWeight: "500", color: "#0d1321" },
  txDate: { fontSize: 13, color: "#9ca3af", marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: "600" },

  emptyState: { alignItems: "center", padding: 32 },
  emptyTitle: { fontSize: 16, fontWeight: "600", color: "#0d1321" },
  emptyBody: { fontSize: 14, color: "#9ca3af", marginTop: 4 },
});
