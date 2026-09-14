import { AppState, Platform } from "react-native";
import { supabase } from "@/lib/supabase";

export function watchAppState() {
  if (Platform.OS === "web") return;
  function refresh(state: string) {
    if (state === "active") supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  }
  refresh(AppState.currentState);
  const listener = AppState.addEventListener("change", refresh);
  return () => {
    listener.remove();
    supabase.auth.stopAutoRefresh();
  };
}
