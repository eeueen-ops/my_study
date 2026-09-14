import { useEffect, useState } from "react";
import {
  AppState,
  AppStateStatus,
  ScrollView,
  StyleSheet,
} from "react-native";

import ReasonSection from "@/components/today/ReasonSection";
import { Reason } from "@/types/reason";

import {
  addReason,
  deleteReason,
  getReasonsByDate,
  updateReason,
} from "@/services/reasonService";

import {
  getToday,
  getTomorrow,
} from "@/utils/date";

export default function TodayScreen() {
  const [todayReasons, setTodayReasons] =
    useState<Reason[]>([]);

  const [tomorrowReasons, setTomorrowReasons] =
    useState<Reason[]>([]);

  const [todayInput, setTodayInput] =
    useState("");

  const [tomorrowInput, setTomorrowInput] =
    useState("");

  const [editingTodayId, setEditingTodayId] =
    useState<string | null>(null);

  const [
    editingTomorrowId,
    setEditingTomorrowId,
  ] = useState<string | null>(null);

  // 오늘 / 내일 이유 불러오기
  const loadReasons = async () => {
    try {
      const todayData = await getReasonsByDate(
        getToday()
      );

      const tomorrowData = await getReasonsByDate(
        getTomorrow()
      );

      setTodayReasons(todayData);
      setTomorrowReasons(tomorrowData);
    } catch (error) {
      console.error("이유 조회 실패:", error);
    }
  };

  // 화면 최초 진입
  useEffect(() => {
    loadReasons();
  }, []);

  // 앱이 백그라운드에서 다시 활성화될 때
  useEffect(() => {
    const subscription =
      AppState.addEventListener(
        "change",
        (nextState: AppStateStatus) => {
          if (nextState === "active") {
            loadReasons();
          }
        }
      );

    return () => {
      subscription.remove();
    };
  }, []);

  // 자정이 되면 오늘 / 내일 데이터 다시 조회
  useEffect(() => {
    let midnightTimer:
      ReturnType<typeof setTimeout>;

    const scheduleMidnightUpdate = () => {
      const now = new Date();

      const nextMidnight = new Date(now);

      nextMidnight.setDate(
        nextMidnight.getDate() + 1
      );

      nextMidnight.setHours(
        0,
        0,
        0,
        0
      );

      const delay =
        nextMidnight.getTime() -
        now.getTime();

      midnightTimer = setTimeout(
        async () => {
          await loadReasons();

          setTodayInput("");
          setTomorrowInput("");

          setEditingTodayId(null);
          setEditingTomorrowId(null);

          scheduleMidnightUpdate();
        },
        delay
      );
    };

    scheduleMidnightUpdate();

    return () => {
      clearTimeout(midnightTimer);
    };
  }, []);

  // 오늘 이유 추가 또는 수정
  const handleTodayAddOrEdit = async (
    content: string
  ) => {
    try {
      if (editingTodayId) {
        const updatedReason =
          await updateReason(
            editingTodayId,
            content
          );

        setTodayReasons((prev) => [
          ...prev,
          updatedReason,
        ]);

        setEditingTodayId(null);
        setTodayInput("");

        return;
      }

      const newReason = await addReason(
        content,
        getToday()
      );

      setTodayReasons((prev) => [
        ...prev,
        newReason,
      ]);

      setTodayInput("");
    } catch (error) {
      console.error(
        "오늘 이유 저장 실패:",
        error
      );
    }
  };

  // 내일 이유 추가 또는 수정
  const handleTomorrowAddOrEdit = async (
    content: string
  ) => {
    try {
      if (editingTomorrowId) {
        const updatedReason =
          await updateReason(
            editingTomorrowId,
            content
          );

        setTomorrowReasons((prev) => [
          ...prev,
          updatedReason,
        ]);

        setEditingTomorrowId(null);
        setTomorrowInput("");

        return;
      }

      const newReason = await addReason(
        content,
        getTomorrow()
      );

      setTomorrowReasons((prev) => [
        ...prev,
        newReason,
      ]);

      setTomorrowInput("");
    } catch (error) {
      console.error(
        "내일 이유 저장 실패:",
        error
      );
    }
  };

  // 오늘 이유 수정 시작
  const handleEditToday = (
    reason: Reason
  ) => {
    setTodayInput(reason.content);
    setEditingTodayId(reason.id);

    setTodayReasons((prev) =>
      prev.filter(
        (item) => item.id !== reason.id
      )
    );
  };

  // 내일 이유 수정 시작
  const handleEditTomorrow = (
    reason: Reason
  ) => {
    setTomorrowInput(reason.content);
    setEditingTomorrowId(reason.id);

    setTomorrowReasons((prev) =>
      prev.filter(
        (item) => item.id !== reason.id
      )
    );
  };

  // 오늘 이유 삭제
  const handleDeleteToday = async (
    id: string
  ) => {
    try {
      await deleteReason(id);

      setTodayReasons((prev) =>
        prev.filter(
          (reason) => reason.id !== id
        )
      );
    } catch (error) {
      console.error(
        "오늘 이유 삭제 실패:",
        error
      );
    }
  };

  // 내일 이유 삭제
  const handleDeleteTomorrow = async (
    id: string
  ) => {
    try {
      await deleteReason(id);

      setTomorrowReasons((prev) =>
        prev.filter(
          (reason) => reason.id !== id
        )
      );
    } catch (error) {
      console.error(
        "내일 이유 삭제 실패:",
        error
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <ReasonSection
        title="오늘의 일어나야 할 이유"
        reasons={todayReasons}
        inputValue={todayInput}
        setInputValue={setTodayInput}
        editingReasonId={editingTodayId}
        onAdd={handleTodayAddOrEdit}
        onEdit={handleEditToday}
        onDelete={handleDeleteToday}
      />

      <ReasonSection
        title="내일의 일어나야 할 이유"
        reasons={tomorrowReasons}
        inputValue={tomorrowInput}
        setInputValue={setTomorrowInput}
        editingReasonId={editingTomorrowId}
        onAdd={handleTomorrowAddOrEdit}
        onEdit={handleEditTomorrow}
        onDelete={handleDeleteTomorrow}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});