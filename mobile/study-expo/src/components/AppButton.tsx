import { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "text";
};
export default function AppButton({
  label,
  onPress,
  disabled,
  loading,
  variant = "primary",
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const blocked = disabled || loading;
  function animate(value: number) {
    Animated.timing(scale, {
      toValue: value,
      duration: 110,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: !!blocked, busy: !!loading }}
        disabled={blocked}
        onPress={onPress}
        onPressIn={() => animate(0.97)}
        onPressOut={() => animate(1)}
        style={[
          styles.button,
          variant === "text" && styles.textButton,
          blocked && { opacity: 0.4 },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variant === "primary" ? "#000" : "#fff"} />
        ) : (
          <Text style={[styles.label]}>{label}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 58,
    padding: 17,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  textButton: { backgroundColor: "transparent", minHeight: 46, padding: 12 },
  label: { color: "#080808", fontSize: 17, fontWeight: "700" },
});
