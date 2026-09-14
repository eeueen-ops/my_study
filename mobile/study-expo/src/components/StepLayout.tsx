import { useEffect, useRef, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  ReduceMotion,
} from "react-native-reanimated";
import IconButton from "./IconButton";

type Props = {
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onBack?: () => void;
  backDisabled?: boolean;
  step?: number;
  total?: number;
};
export default function StepLayout({
  title,
  description,
  children,
  footer,
  onBack,
  backDisabled,
  step = 0,
  total,
}: Props) {
  const scroll = useRef<ScrollView>(null);
  useEffect(() => {
    scroll.current?.scrollTo({ y: 0, animated: false });
  }, [step]);
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.top}>
          {onBack && (
            <IconButton
              name="arrow-left"
              label="뒤로"
              onPress={onBack}
              disabled={backDisabled}
            />
          )}
          {total && (
            <View
              accessibilityLabel={`${step + 1} / ${total} 단계`}
              style={styles.track}
            >
              <View
                style={[
                  styles.progress,
                  { width: `${((step + 1) / total) * 100}%` },
                ]}
              />
            </View>
          )}
        </View>
        <ScrollView
          ref={scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            key={step}
            entering={FadeInRight.duration(200).reduceMotion(
              ReduceMotion.System,
            )}
            exiting={FadeOutLeft.duration(120)}
          >
            <Text accessibilityRole="header" style={styles.title}>
              {title}
            </Text>
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
            <View style={styles.body}>{children}</View>
          </Animated.View>
        </ScrollView>
        <View style={styles.footer}>{footer}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#8aa777" },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 26,
    paddingHorizontal: 26,
    paddingTop: 12,
    paddingBottom: 18,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },
  track: { flex: 1, height: 2, backgroundColor: "#fff" },
  progress: { height: 2, backgroundColor: "#374230" },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 32,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },
  title: {
    fontSize: 31,
    lineHeight: 43,
    fontWeight: "700",
    letterSpacing: -1,
    color: "#f5f5f5",
  },
  description: { color: "#999", fontSize: 15, lineHeight: 25, marginTop: 15 },
  body: { marginTop: 40, gap: 18 },
  footer: {
    paddingHorizontal: 26,
    paddingTop: 12,
    paddingBottom: 18,
    gap: 4,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },
});
