import Feather from '@expo/vector-icons/Feather';
import { Pressable } from 'react-native';
import type { ComponentProps } from 'react';

type Props = {
  name: ComponentProps<typeof Feather>['name'];
  label: string;
  onPress: () => void;
  disabled?: boolean;
};
export default function IconButton({ name, label, onPress, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#171717',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.3 : pressed ? 0.6 : 1,
        transform: [{ scale: pressed ? 0.94 : 1 }],
      })}
    >
      <Feather name={name} color="#eee" size={21} />
    </Pressable>
  );
}
