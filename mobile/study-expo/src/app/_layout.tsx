import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "@/providers/AuthProvider";

function RootNavigator() {
  const { session, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function PageLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}