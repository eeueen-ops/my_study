import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { form } from "@/constants/form";

export default function MyScreen() {
  const { session } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [nickname, setNickname] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function saveProfile() {
    if (!session || saving) return;
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      // 같은 id가 없으면 추가하고, 있으면 닉네임을 수정합니다.
      const { error } = await supabase.from("profiles").upsert({
        id: session.user.id,
        nickname: nickname.trim(),
      });
      if (error) {
        setMessage(error.message);
        return;
      }
      setMessage("닉네임을 저장했습니다.");
    } catch {
      setMessage("연결을 확인해주세요.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
        return;
      }
      // SIGNED_OUT를 받은 Provider와 라우터가 화면을 바꿉니다.
    } catch {
      setError("로그아웃 요청에 실패했습니다.");
    }
  }
  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>MY</Text>
        <View style={styles.profile}>
          <Feather name="user" size={31} color="#ddd" />
        </View>
        <Text style={styles.email}>{session?.user.email}</Text>
        <View style={{ marginTop: 28, gap: 14 }}>
          <Text style={form.label}>닉네임</Text>
          <TextInput
            accessibilityLabel="닉네임"
            style={form.input}
            placeholder="닉네임을 입력해주세요"
            placeholderTextColor="#666"
            value={nickname}
            onChangeText={setNickname}
            editable={!saving}
          />
          <AppButton
            label="닉네임 저장"
            onPress={saveProfile}
            loading={saving}
          />
          {!!message && (
            <Text accessibilityLiveRegion="polite" style={form.hint}>
              {message}
            </Text>
          )}
        </View>
        <AppButton
          label="로그아웃"
          variant="text"
          onPress={logout}
          disabled={saving}
        />

        {!!error && <Text style={styles.error}>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 28, width: "100%", maxWidth: 560, alignSelf: "center" },
  title: { color: "#fff", fontSize: 32, fontWeight: "700", marginTop: 24 },
  profile: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#1b1b1b",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 54,
    marginBottom: 28,
  },
  email: { color: "#eee", fontSize: 23, fontWeight: "600" },
  caption: { color: "#999", fontSize: 14, lineHeight: 25, marginTop: 13 },
  rule: {
    marginTop: 48,
    paddingVertical: 22,
    marginBottom: 32,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#242424",
  },
  error: { color: "#ddd", fontSize: 14, lineHeight: 23 },
});