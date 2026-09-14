import { StyleSheet } from "react-native";
// 반복되는 입력창과 안내 문구 스타일만 공유합니다.
export const form = StyleSheet.create({
  input: {
    color: "#fff",
    fontSize: 23,
    lineHeight: 32,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#4b4b4b",
  },
  label: { color: "#999", fontSize: 14 },
  hint: { color: "#999", fontSize: 14, lineHeight: 23 },
  error: { color: "#eee", fontSize: 14, lineHeight: 23, marginTop: 12 },
});
