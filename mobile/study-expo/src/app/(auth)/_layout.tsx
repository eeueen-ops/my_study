import { Stack } from "expo-router";
export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="welcome"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#8aa777" },
        animation: "slide_from_right",
      }}
    />
  );
}
