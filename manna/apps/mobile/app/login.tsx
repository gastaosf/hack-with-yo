'use client';
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

// NOTE: Privy email OTP login (@privy-io/expo) to be wired here once the SDK
// integration is confirmed. For demo, any non-empty email proceeds to dashboard.

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (email.trim().length > 0) {
      router.replace("/(app)/dashboard");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.logo}>manna</Text>
            <Text style={styles.tagline}>B2B Euro Savings</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Sign in to Manna</Text>
            <Text style={styles.subheading}>
              Enter your business email to continue
            </Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@company.com"
              placeholderTextColor="rgba(255,255,255,0.35)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity
              style={[styles.button, !email.trim() && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={!email.trim()}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Continue with email →</Text>
            </TouchableOpacity>

            <Text style={styles.legal}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          <Text style={styles.trustNote}>
            SEPA bank transfer · No minimum · Withdraw anytime
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1321",
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    fontSize: 36,
    fontWeight: "700",
    color: "#4ec99b",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.50)",
    marginTop: 6,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 28,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: "rgba(255,255,255,0.55)",
    marginBottom: 28,
    lineHeight: 22,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2d9f6f",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  legal: {
    textAlign: "center",
    fontSize: 12,
    color: "rgba(255,255,255,0.30)",
    marginTop: 20,
    lineHeight: 18,
  },
  trustNote: {
    textAlign: "center",
    fontSize: 13,
    color: "rgba(255,255,255,0.30)",
    marginTop: 32,
  },
});
