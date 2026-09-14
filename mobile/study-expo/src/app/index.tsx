import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
export default function Index() {
  const { session } = useContext(AuthContext);
  return <Redirect href={session ? "/(tabs)" : "/(auth)/welcome"} />;
}