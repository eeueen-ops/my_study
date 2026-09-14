import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Reason } from "@/types/reason";
import ReasonItem from "./ReasonItem";

type ReasonSectionProps = {
  title: string;
  reasons: Reason[];

  inputValue: string;
  setInputValue: (value: string) => void;

  editingReasonId: string | null;

  onAdd: (content: string) => void;
  onEdit: (reason: Reason) => void;
  onDelete: (id: string) => void;
};

export default function ReasonSection({
  title,
  reasons,
  inputValue,
  setInputValue,
  editingReasonId,
  onAdd,
  onEdit,
  onDelete,
}: ReasonSectionProps) {
  const handleAdd = () => {
    const content = inputValue.trim();

    if (!content) {
      return;
    }

    onAdd(content);
    setInputValue("");
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.reasonArea}>
        {reasons.map((reason) => (
          <ReasonItem
            key={reason.id}
            reason={reason}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={
              editingReasonId
                ? "수정할 내용을 입력해주세요"
                : "일어나야 할 이유를 입력해주세요"
            }
          />

          <Pressable style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  reasonArea: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    overflow: "hidden",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
    borderWidth: 0,
  },

  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  addButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222222",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
});
