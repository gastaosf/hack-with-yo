import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import {
  Home,
  ArrowUpDown,
  CreditCard,
  Settings,
} from "lucide-react-native";

type IconProps = { color: string };

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#e4e4dc",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 84 : 64,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#2d9f6f",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: IconProps) => (
            <Home size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers/index"
        options={{
          title: "Transfers",
          tabBarIcon: ({ color }: IconProps) => (
            <ArrowUpDown size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          title: "Card",
          tabBarIcon: ({ color }: IconProps) => (
            <CreditCard size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }: IconProps) => (
            <Settings size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
      {/* Deposit and withdraw are pushed screens — hide from tab bar */}
      <Tabs.Screen name="transfers/deposit" options={{ href: null }} />
      <Tabs.Screen name="transfers/withdraw" options={{ href: null }} />
    </Tabs>
  );
}
