import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = { label: string; selected: boolean; onPress: () => void };
export default function OptionButton({ label, selected, onPress }: Props) {
  const background = useAnimatedStyle(() => ({
    backgroundColor: withTiming(selected ? '#292929' : '#111', { duration: 150 }),
  }));
  return (
    <Animated.View style={[{ borderRadius: 16 }, background]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityLabel={label}
        accessibilityState={{ checked: selected }}
        onPress={onPress}
        style={({ pressed }) => [styles.option, { opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={[styles.label, selected && { color: '#fff' }]}>{label}</Text>
        <Feather
          name={selected ? 'check-circle' : 'circle'}
          color={selected ? '#fff' : '#444'}
          size={21}
        />
      </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderRadius: 16,
  },
  label: { flex: 1, color: '#aaa', fontSize: 17, lineHeight: 25 },
});
