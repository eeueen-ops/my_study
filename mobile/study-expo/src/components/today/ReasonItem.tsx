import { Pressable, StyleSheet, Text, View } from "react-native";

import { Reason } from "@/types/reason";

type ReasonItemProps = {
  reason: Reason;
  onEdit: (reason: Reason) => void;
  onDelete: (id: string) => void;
};

export default function ReasonItem({
  reason,
  onEdit,
  onDelete,
}: ReasonItemProps) {
  return (
    <View style={styles.reasonItem}>
      <Text style={styles.reasonText}>{reason.content}</Text>

      <View style={styles.actionButtons}>
        <Pressable style={styles.button} onPress={() => onEdit(reason)}>
          <Text style={styles.buttonText}>수정</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => onDelete(reason.id)}>
          <Text style={styles.buttonText}>삭제</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reasonItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  reasonText: {
    fontSize: 16,
    marginBottom: 12,
  },

  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },

  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#E8E8E8",
  },

  buttonText: {
    fontSize: 13,
  },
});
