import { useState } from "react";
import { Modal, Pressable, Text, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { supabase } from "@/lib/supabase";
import { Reason } from "@/types/reason";

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDayPress = async (day: { dateString: string }) => {
    const clickedDate = day.dateString;

    setSelectedDate(clickedDate);
    setModalVisible(true);
    setLoading(true);

    const { data, error } = await supabase
      .from("reasons")
      .select("*")
      .eq("date", clickedDate);

    if (error) {
      console.error(error);
      setReasons([]);
      setLoading(false);
      return;
    }

    setReasons(data ?? []);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={handleDayPress} />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.dateText}>{selectedDate}</Text>

            {loading ? (
              <Text>불러오는 중...</Text>
            ) : reasons.length > 0 ? (
              reasons.map((reason) => (
                <View key={reason.id} style={styles.reasonItem}>
                  <Text>{reason.content}</Text>
                </View>
              ))
            ) : (
              <Text>해당 날짜에 저장된 데이터가 없습니다.</Text>
            )}

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 24,
  },

  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  reasonItem: {
    marginBottom: 16,
  },

  reasonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 4,
  },

  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#111",
    alignItems: "center",
  },

  closeButtonText: {
    color: "white",
  },
});
