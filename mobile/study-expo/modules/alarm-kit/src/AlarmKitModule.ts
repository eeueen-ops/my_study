import { requireNativeModule } from "expo-modules-core";

type AuthorizationStatus =
  | "authorized"
  | "denied"
  | "notDetermined"
  | "unknown";

interface AlarmKitModule {
  requestAuthorization(): Promise<AuthorizationStatus>;

  scheduleAlarm(
    id: string,
    timestamp: number,
    title: string,
  ): Promise<string>;

  cancelAlarm(id: string): Promise<void>;
}

export default requireNativeModule<AlarmKitModule>(
  "AlarmKitModule",
);