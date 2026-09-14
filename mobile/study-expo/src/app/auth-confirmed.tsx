import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Platform, Text } from "react-native";
import StepLayout from "@/components/StepLayout";
import { form } from "@/constants/form";

// Supabase가 메일을 인증한 뒤 여는 안내 화면입니다. 앱 세션을 만들지는 않습니다.
export default function AuthConfirmedScreen() {
  const { result } = useLocalSearchParams<{ result?: string }>();
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const query = new URLSearchParams(window.location.search);
    if (
      !window.location.hash &&
      !query.has("error") &&
      !query.has("error_description")
    )
      return;
    const hasError =
      hash.has("error") ||
      hash.has("error_description") ||
      query.has("error") ||
      query.has("error_description");
    const result = hasError
      ? "error"
      : hash.has("access_token")
        ? "success"
        : "unknown";
    // 브라우저 안내 페이지를 토큰 없는 주소로 교체합니다. 앱 세션은 만들지 않습니다.
    window.location.replace(`${window.location.pathname}?result=${result}`);
  }, [result]);

  const message =
    result === "error"
      ? "인증 링크가 만료되었거나 유효하지 않습니다. 강사와 메일 발송 설정을 확인하고 새 인증 링크를 요청해주세요."
      : result === "success"
        ? "이메일 인증을 완료했습니다. 앱으로 돌아가 로그인해주세요."
        : "인증 메일의 링크를 열었다면 앱으로 돌아가 로그인해주세요.";
  return (
    <StepLayout title="앱에서 이어갈게요.">
      <Text style={form.hint}>{message}</Text>
    </StepLayout>
  );
}