import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Providers } from "../lib/providers";

export default function RootLayout() {
  return (
    <Providers>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="(app)" />
        </Stack>
      </SafeAreaProvider>
    </Providers>
  );
}
