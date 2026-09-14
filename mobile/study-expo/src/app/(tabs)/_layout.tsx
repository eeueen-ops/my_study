import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "오늘",
        }}
      />

      <Tabs.Screen
        name="month"
        options={{
          title: "한 달",
        }}
      />

      <Tabs.Screen
        name="alarm"
        options={{
          title: "알람",
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
        }}
      />

    </Tabs>
  );
}
