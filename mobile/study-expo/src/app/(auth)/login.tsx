import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput } from "react-native";
import StepLayout from "@/components/StepLayout";
import AppButton from "@/components/AppButton";
import { supabase } from "@/lib/supabase";
import { form } from "@/constants/form";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function login() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) setError(error.message);
      // SIGNED_IN을 받은 Provider와 라우터가 화면을 바꿉니다.
    } catch {
      setError("연결을 확인하고 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <StepLayout
      title="Log In"
      onBack={() => router.replace("/(auth)/welcome")}
      footer={
        <>
          <AppButton
            label="로그인"
            onPress={login}
            loading={busy}
            disabled={!email.trim() || !password}
          />
          <AppButton
            label="계정 생성하기"
            variant="text"
            onPress={() => router.replace("/(auth)/signup")}
          />
        </>
      }
    >
      <Text style={form.label}>이메일</Text>
      <TextInput
        accessibilityLabel="이메일"
        style={form.input}
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        placeholderTextColor="#666"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        autoComplete="email"
      />
      <Text style={[form.label, { marginTop: 22 }]}>비밀번호</Text>
      <TextInput
        accessibilityLabel="비밀번호"
        style={form.input}
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호"
        placeholderTextColor="#666"
        secureTextEntry
        autoComplete="current-password"
        onSubmitEditing={login}
      />
      {!!error && (
        <Text accessibilityRole="alert" style={form.error}>
          {error}
        </Text>
      )}
    </StepLayout>
  );
}
