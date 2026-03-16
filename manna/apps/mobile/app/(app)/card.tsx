'use client';
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CARD_DETAILS, CARD_TRANSACTIONS } from "@manna/shared";

export default function CardScreen() {
  const [showNumber, setShowNumber] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [frozen, setFrozen] = useState(false);

  const maskedNumber = "•••• •••• •••• " + CARD_DETAILS.number.slice(-4);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafaf5" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>Card</Text>
          {frozen && (
            <View style={styles.frozenBadge}>
              <Text style={styles.frozenBadgeText}>Frozen</Text>
            </View>
          )}
        </View>

        {/* Virtual card */}
        <View style={[styles.virtualCard, frozen && styles.virtualCardFrozen]}>
          <View style={styles.cardTop}>
            <Text style={styles.cardBrand}>manna</Text>
            <Text style={styles.cardNetwork}>{CARD_DETAILS.network}</Text>
          </View>

          {/* Chip */}
          <View style={styles.chip}>
            <View style={styles.chipLine} />
            <View style={styles.chipLine} />
          </View>

          <View style={styles.cardNumber}>
            <Text style={styles.cardNumberText}>
              {showNumber ? CARD_DETAILS.number : maskedNumber}
            </Text>
            <TouchableOpacity
              onPress={() => setShowNumber(!showNumber)}
              style={styles.revealBtn}
            >
              <Text style={{ color: "rgba(255,255,255,0.50)", fontSize: 16 }}>
                {showNumber ? "🙈" : "👁"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.cardFieldLabel}>VALID THRU</Text>
              <Text style={styles.cardFieldValue}>{CARD_DETAILS.expiry}</Text>
            </View>
            <View>
              <Text style={styles.cardFieldLabel}>CVV</Text>
              <TouchableOpacity onPress={() => setShowCvv(!showCvv)}>
                <Text style={styles.cardFieldValue}>
                  {showCvv ? CARD_DETAILS.cvv : "•••"}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardHolder}>{CARD_DETAILS.holder}</Text>
          </View>
        </View>

        {/* Card actions */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.actionBtn, frozen && styles.actionBtnActive]}
            activeOpacity={0.7}
            onPress={() => setFrozen(!frozen)}
          >
            <Text style={{ fontSize: 20 }}>❄️</Text>
            <Text style={[styles.actionLabel, frozen && { color: "#2d9f6f" }]}>
              {frozen ? "Unfreeze" : "Freeze card"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Text style={{ fontSize: 20 }}>⚙️</Text>
            <Text style={styles.actionLabel}>Limits</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Text style={{ fontSize: 20 }}>🚩</Text>
            <Text style={styles.actionLabel}>Report</Text>
          </TouchableOpacity>
        </View>

        {/* Card transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Transactions</Text>
          <View style={styles.card}>
            {CARD_TRANSACTIONS.map((tx, i) => (
              <View
                key={tx.id}
                style={[
                  styles.txRow,
                  i < CARD_TRANSACTIONS.length - 1 && styles.txBorder,
                ]}
              >
                <View style={styles.txIcon}>
                  <Text style={{ fontSize: 16 }}>🛒</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.txMerchant}>{tx.merchant}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 2,
                    }}
                  >
                    <Text style={styles.txDate}>
                      {new Date(tx.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Text>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{tx.category}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.txAmount}>
                  −€{Math.abs(tx.amount).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: { fontSize: 24, fontWeight: "700", color: "#0d1321" },
  frozenBadge: {
    backgroundColor: "#eff6ff",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  frozenBadgeText: { fontSize: 12, fontWeight: "600", color: "#3b82f6" },

  virtualCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 24,
    backgroundColor: "#0d1321",
    aspectRatio: 1.586,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    justifyContent: "space-between",
  },
  virtualCardFrozen: {
    opacity: 0.6,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBrand: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4ec99b",
    letterSpacing: -0.5,
  },
  cardNetwork: {
    fontSize: 14,
    color: "rgba(255,255,255,0.60)",
    fontWeight: "500",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  chip: {
    width: 36,
    height: 28,
    backgroundColor: "#c8a84b",
    borderRadius: 6,
    justifyContent: "space-around",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  chipLine: { height: 2, backgroundColor: "#a07830", borderRadius: 1 },
  cardNumber: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardNumberText: {
    fontSize: 17,
    fontWeight: "500",
    color: "rgba(255,255,255,0.90)",
    letterSpacing: 2,
    flex: 1,
  },
  revealBtn: { padding: 4 },
  cardBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  cardFieldLabel: {
    fontSize: 9,
    color: "rgba(255,255,255,0.50)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardFieldValue: { fontSize: 15, fontWeight: "500", color: "#ffffff" },
  cardHolder: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.80)",
    letterSpacing: 0.8,
  },

  cardActions: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e4e4dc",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  actionBtnActive: {
    borderColor: "#2d9f6f",
    backgroundColor: "#e8f5ef",
  },
  actionLabel: { fontSize: 11, fontWeight: "500", color: "#4b5563" },

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
    backgroundColor: "#f4f4ef",
    alignItems: "center",
    justifyContent: "center",
  },
  txMerchant: { fontSize: 15, fontWeight: "500", color: "#0d1321" },
  txDate: { fontSize: 12, color: "#9ca3af" },
  categoryBadge: {
    backgroundColor: "#f4f4ef",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  categoryText: { fontSize: 11, fontWeight: "500", color: "#4b5563" },
  txAmount: { fontSize: 15, fontWeight: "600", color: "#0d1321" },
});
