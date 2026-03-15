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
  useYieldStats,
  useTransactionHistory,
  formatEur,
  formatEurCompact,
  COMPANY_PROFILE,
} from "@manna/shared";

// ─── Balance card ─────────────────────────────────────────────────────────────

function BalanceCard() {
  const { balanceFloat, isLoading: bLoading } = useEurBalance();
  const { apyPercent, yieldEarnedFloat, isLoading: yLoading } = useYieldStats();
  const isLoading = bLoading || yLoading;

  // Demo fallbacks — shown while wallet is not connected or chain data is loading
  const displayBalance = isLoading ? 0 : balanceFloat;
  const displayApy = apyPercent ?? 4.2;
  const displayEarned = isLoading ? 0 : yieldEarnedFloat;
  const displayProjected = (displayBalance * displayApy) / 100;

  return (
    <View style={styles.balanceCard}>
      <View style={styles.cardTopRow}>
        <Text style={styles.cardLabel}>Treasury Balance</Text>
        <Text style={styles.cardMark}>M</Text>
      </View>
      <Text style={styles.balanceAmount}>
        {isLoading ? "—" : formatEur(displayBalance)}
      </Text>
      <View style={styles.apyBadge}>
        <Text style={styles.apyText}>
          {displayApy.toFixed(1)}% Annual Return
        </Text>
      </View>
      <View style={styles.cardDivider} />
      <View style={styles.statsRow}>
        <View>
          <Text style={styles.statLabel}>Earnings this month</Text>
          <Text style={styles.statValue}>
            {isLoading ? "—" : `+${formatEur(displayEarned)}`}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.statLabel}>Projected annual</Text>
          <Text style={styles.statValue}>
            {isLoading ? "—" : formatEurCompact(displayProjected)}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── Quick actions ────────────────────────────────────────────────────────────

function QuickActions() {
  return (
    <View style={styles.quickActions}>
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => router.push("/(app)/transfers/deposit")}
        activeOpacity={0.85}
      >
        <Text style={styles.primaryBtnText}>↑ Add Funds</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => router.push("/(app)/transfers/withdraw")}
        activeOpacity={0.85}
      >
        <Text style={styles.secondaryBtnText}>↓ Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Activity feed ────────────────────────────────────────────────────────────

function ActivityFeed() {
  const { items, isLoading } = useTransactionHistory();
  const recent = items.slice(0, 4);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity onPress={() => router.push("/(app)/transfers/")}>
          <Text style={styles.linkText}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {isLoading ? (
          <Text style={styles.emptyText}>Loading...</Text>
        ) : recent.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No activity yet</Text>
            <Text style={styles.emptyBody}>Add funds to start earning</Text>
          </View>
        ) : (
          recent.map((item, i) => (
            <View
              key={item.id}
              style={[
                styles.txRow,
                i < recent.length - 1 && styles.txBorder,
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
                <Text style={{ fontSize: 16 }}>
                  {item.type === "deposit" ? "↓" : "↑"}
                </Text>
              </View>
              <View style={styles.txMeta}>
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
                  { color: item.amountFloat > 0 ? "#2d9f6f" : "#0d1321" },
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
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function DashboardScreen() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafaf5" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {greeting}, {COMPANY_PROFILE.name}
            </Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => router.push("/(app)/settings")}
          >
            <Text style={{ fontSize: 18, color: "#4b5563" }}>⚙</Text>
          </TouchableOpacity>
        </View>

        <BalanceCard />
        <QuickActions />
        <ActivityFeed />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: { fontSize: 17, fontWeight: "600", color: "#0d1321" },
  date: { fontSize: 13, color: "#9ca3af", marginTop: 2 },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f4f4ef",
    alignItems: "center",
    justifyContent: "center",
  },

  balanceCard: {
    marginHorizontal: 16,
    borderRadius: 28,
    padding: 28,
    backgroundColor: "#0d1321",
    shadowColor: "#0d1321",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.60)",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  cardMark: {
    fontSize: 14,
    color: "rgba(255,255,255,0.20)",
    fontWeight: "700",
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  apyBadge: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "rgba(45,159,111,0.25)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  apyText: { fontSize: 13, fontWeight: "600", color: "#4ec99b" },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginVertical: 20,
  },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.50)",
    marginBottom: 4,
  },
  statValue: { fontSize: 18, fontWeight: "600", color: "#4ec99b" },

  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 20,
  },
  primaryBtn: {
    flex: 1,
    height: 52,
    backgroundColor: "#2d9f6f",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#ffffff", fontSize: 15, fontWeight: "600" },
  secondaryBtn: {
    flex: 1,
    height: 52,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e4e4dc",
  },
  secondaryBtnText: { color: "#0d1321", fontSize: 15, fontWeight: "600" },

  section: { marginHorizontal: 16, marginTop: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: "600", color: "#0d1321" },
  linkText: { fontSize: 13, color: "#2d9f6f" },

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
  txMeta: { flex: 1 },
  txLabel: { fontSize: 15, fontWeight: "500", color: "#0d1321" },
  txDate: { fontSize: 13, color: "#9ca3af", marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: "600" },

  emptyState: { alignItems: "center", padding: 32 },
  emptyTitle: { fontSize: 16, fontWeight: "600", color: "#0d1321" },
  emptyBody: { fontSize: 14, color: "#9ca3af", marginTop: 4 },
  emptyText: { textAlign: "center", padding: 20, color: "#9ca3af" },
});
