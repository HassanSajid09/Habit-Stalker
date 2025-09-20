import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import type { HabitsType } from "../types/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const getAllHabits = async () => {
  const res = await axios.get("/habit", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const createHabit = async ({ body }: { body: HabitsType }) => {
  const res = await axios.post("/habit", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const useHabits = () => {
  const navigate = useNavigate();

  const {
    data: Habits,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["Habits"],
    queryFn: getAllHabits,
  });

  const create = useMutation({
    mutationFn: createHabit,
    mutationKey: ["Habit"],
    onSuccess: () => {
      toast.success("Habit Created Successfully!");
      navigate("/habits");
    },
    onError: (err: unknown) => {
      toast.error("Failed to create habit!");
      console.log(err);
    },
  });
  return { isError, isPending, Habits, create };
};
