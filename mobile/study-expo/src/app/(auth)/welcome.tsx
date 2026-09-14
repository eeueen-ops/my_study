import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>TITLE</Text>
        <View style={styles.message}>
          <Text style={styles.title}>
            나를 일어나게 하는 이유를{"\n"}기록 해보세요.
          </Text>
          <Text style={styles.description}>일찍일어나자{"\n"}</Text>
        </View>
        <View style={styles.footer}>
          <AppButton
            label="계정 생성하기"
            onPress={() => router.push("/(auth)/signup")}
          />
          <AppButton
            label="로그인 하기"
            variant="text"
            onPress={() => router.push("/(auth)/login")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#8aa777" },
  content: {
    flexGrow: 1,
    padding: 28,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },
  brand: {
    color: "#fff",
    fontSize: 43,
    fontWeight: "800",
    letterSpacing: -2,
    marginTop: 42,
  },
  message: { flex: 1, justifyContent: "center", paddingVertical: 76 },
  title: {
    color: "#f7f7f7",
    fontSize: 32,
    lineHeight: 47,
    fontWeight: "700",
    letterSpacing: -1.3,
  },
  description: {
    color: "#d2d2d2",
    fontSize: 15,
    lineHeight: 26,
    marginTop: 25,
  },
  footer: { gap: 8, paddingBottom: 12 },
});
