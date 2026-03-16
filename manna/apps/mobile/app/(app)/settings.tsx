'use client';
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { COMPANY_PROFILE, LINKED_BANK } from "@manna/shared";

// ─── Row component ────────────────────────────────────────────────────────────

interface RowProps {
  label: string;
  value?: string;
  badge?: "active" | null;
  onPress?: () => void;
  showChevron?: boolean;
  destructive?: boolean;
}

function SettingsRow({
  label,
  value,
  badge,
  onPress,
  showChevron = true,
  destructive = false,
}: RowProps) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.rowLabel, destructive && styles.rowLabelDestructive]}>
        {label}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {badge === "active" && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>Active</Text>
          </View>
        )}
        {value && <Text style={styles.rowValue}>{value}</Text>}
        {showChevron && onPress && (
          <Text style={{ color: "#c8c8be", fontSize: 16 }}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─── Section component ────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  const handleSignOut = () => {
    Alert.alert("Sign out of Manna?", "Your data will remain secure.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: () => router.replace("/login"),
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafaf5" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 24, color: "#0d1321" }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Section title="COMPANY">
          <SettingsRow
            label="Company Name"
            value={COMPANY_PROFILE.name}
            showChevron={false}
          />
          <SettingsRow
            label="Business Registration"
            value={COMPANY_PROFILE.registration}
            showChevron={false}
          />
          <SettingsRow
            label="Country"
            value={COMPANY_PROFILE.country}
            showChevron={false}
          />
        </Section>

        <Section title="CONNECTED BANK">
          <SettingsRow
            label="Bank Account"
            value={`${LINKED_BANK.bank}  ••${LINKED_BANK.lastFour}`}
            showChevron={false}
          />
          <SettingsRow
            label="SEPA Mandate"
            badge="active"
            showChevron={false}
          />
        </Section>

        <Section title="SECURITY">
          <SettingsRow
            label="Email"
            value={COMPANY_PROFILE.email}
            showChevron={false}
          />
          <SettingsRow
            label="Two-Factor Auth"
            badge="active"
            showChevron={false}
          />
          <SettingsRow
            label="Active Sessions"
            value="2 devices"
            onPress={() => {}}
          />
          <SettingsRow
            label="Download Data"
            onPress={() => {}}
          />
        </Section>

        <Section title="PREFERENCES">
          <SettingsRow
            label="Language"
            value="English (UK)"
            onPress={() => {}}
          />
          <SettingsRow
            label="Notifications"
            onPress={() => {}}
          />
          <SettingsRow
            label="Statement Frequency"
            value="Monthly"
            onPress={() => {}}
          />
        </Section>

        <View style={styles.signOutSection}>
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={handleSignOut}
            activeOpacity={0.8}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionNote}>Manna v0.1.0 · Hack with YO</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

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

  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9ca3af",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionCard: {
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

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0ea",
  },
  rowLabel: { fontSize: 15, fontWeight: "500", color: "#0d1321" },
  rowLabelDestructive: { color: "#e53e3e" },
  rowValue: { fontSize: 14, color: "#9ca3af" },
  activeBadge: {
    backgroundColor: "#e8f5ef",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  activeBadgeText: { fontSize: 12, fontWeight: "600", color: "#2d9f6f" },

  signOutSection: { paddingHorizontal: 16, marginTop: 28 },
  signOutBtn: {
    borderWidth: 1.5,
    borderColor: "#e53e3e",
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: "center",
  },
  signOutText: { fontSize: 15, fontWeight: "600", color: "#e53e3e" },

  versionNote: {
    textAlign: "center",
    fontSize: 12,
    color: "#c8c8be",
    marginTop: 20,
  },
});
