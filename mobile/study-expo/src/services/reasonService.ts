import { supabase } from "@/lib/supabase";
import { Reason } from "@/types/reason";

const getCurrentUserId = async (): Promise<string> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error("로그인된 사용자가 없습니다.");
  }

  return user.id;
};

// 특정 날짜의 이유 조회
export const getReasonsByDate = async (date: string): Promise<Reason[]> => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("reasons")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
};

// 이유 추가
export const addReason = async (
  content: string,
  date: string,
): Promise<Reason> => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("reasons")
    .insert({
      user_id: userId,
      content,
      date,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// 이유 수정
export const updateReason = async (
  id: string,
  content: string,
): Promise<Reason> => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("reasons")
    .update({
      content,
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// 이유 삭제
export const deleteReason = async (id: string): Promise<void> => {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("reasons")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
};
