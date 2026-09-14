import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput } from "react-native";
import StepLayout from "@/components/StepLayout";
import AppButton from "@/components/AppButton";
import { supabase } from "@/lib/supabase";
import { form } from "@/constants/form";

// 비밀번호를 경로 파라미터로 보내지 않고, 한 화면의 state에만 둡니다.
export default function SignupScreen() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const titles = [
    "사용할 이메일을\n입력해주세요.",
    "비밀번호를\n입력해주세요.",
    "비밀번호를\n확인해주세요.",
  ];
  function back() {
    if (step > 0) setStep(step - 1);
    else router.replace("/(auth)/welcome");
  }
  async function next() {
    if (busy) return;
    setError("");
    if (step === 0 && !email.includes("@")) {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (step === 1 && password.length < 8) {
      setError("비밀번호를 8자 이상 입력해주세요.");
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    if (password !== confirmation) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });
      if (error) setError(error.message);
      else {
        setPassword("");
        setConfirmation("");
        setSent(true);
      }
    } catch {
      setError("연결을 확인하고 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  }
  if (sent) {
    return (
      <StepLayout
        title="메일을 확인해주세요."
        description="인증 메일의 링크를 누른 뒤 앱으로 돌아와 로그인해주세요."
        footer={
          <AppButton
            label="로그인으로"
            onPress={() => router.replace("/(auth)/login")}
          />
        }
      >
        <Text style={form.hint}>{email}</Text>
      </StepLayout>
    );
  }
  return (
    <StepLayout
      title={titles[step]}
      description={step === 1 ? "비밀번호는 8자 이상이어야 합니다." : undefined}
      onBack={back}
      backDisabled={busy}
      step={step}
      total={3}
      footer={
        <AppButton
          label={step === 2 ? "가입하기" : "다음"}
          onPress={next}
          loading={busy}
        />
      }
    >
      {step === 0 && (
        <TextInput
          editable={!busy}
          accessibilityLabel="가입 이메일"
          style={form.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          placeholderTextColor="#374230"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          autoComplete="email"
          onSubmitEditing={next}
        />
      )}
      {step === 1 && (
        <TextInput
          editable={!busy}
          accessibilityLabel="새 비밀번호"
          style={form.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호"
          placeholderTextColor="#374230"
          secureTextEntry
          autoComplete="new-password"
          onSubmitEditing={next}
        />
      )}
      {step === 2 && (
        <TextInput
          editable={!busy}
          accessibilityLabel="비밀번호 확인"
          style={form.input}
          value={confirmation}
          onChangeText={setConfirmation}
          placeholder="비밀번호 확인"
          placeholderTextColor="#374230"
          secureTextEntry
          onSubmitEditing={next}
        />
      )}
      {!!error && (
        <Text accessibilityRole="alert" style={form.error}>
          {error}
        </Text>
      )}
    </StepLayout>
  );
}
