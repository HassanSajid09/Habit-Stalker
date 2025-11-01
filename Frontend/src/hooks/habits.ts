import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import type { HabitsType } from "../types/types";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const token = localStorage.getItem("token");

const getAllHabits = async () => {
  const res = await axios.get("/habit", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getOneHabit = async ({ queryKey }: any) => {
  const [_key, id] = queryKey;
  console.log("id:", id);
  const res = await axios.get(`/habit/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getHabitByCategory = async (category: string) => {
  const res = await axios.get(`/habit/category/${category}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getHabitByPriority = async (priority: any) => {
  const res = await axios.get(`/habit/priority/${priority}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const createHabit = async ({ body }: { body: HabitsType }) => {
  console.log("Sending the habit data: ", body);
  const res = await axios.post("/habit", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

const deleteHabit = async ({ id }: { id: string | undefined }) => {
  await axios.delete(`/habit/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
    retry: false,
  });

  const { id } = useParams();

  const { data: Habit } = useQuery({
    queryKey: ["Habit", id],
    queryFn: getOneHabit,
    retry: false,
    enabled: !!id,
  });

  const useHabitsByCategory = (category: string) => {
    return useQuery({
      queryKey: ["HabitsByCategory", category],
      queryFn: () => getHabitByCategory(category),
      enabled: !!category, // only fetch if category is truthy
    });
  };
  const useHabitsByPriority = (priority: string) => {
    return useQuery({
      queryKey: ["HabitsByPriority", priority],
      queryFn: () => getHabitByPriority(priority),
      enabled: !!priority, // only fetch if category is truthy
    });
  };

  const create = useMutation({
    mutationFn: createHabit,
    mutationKey: ["Habit"],
    onSuccess: () => {
      toast.success("Habit Saved Successfully!");
      navigate("/habits");
    },
    onError: (err: unknown) => {
      toast.error("Failed to save habit!");
      console.log(err);
    },
  });

  const del = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      toast.success("Habit Deleted Successfully!");
      navigate("/habits");
    },
    onError: (err: unknown) => {
      toast.error("Failed to delete habit!");
      console.log(err);
    },
  });
  return {
    isError,
    isPending,
    Habits,
    create,
    Habit,
    useHabitsByCategory,
    useHabitsByPriority,
    getOneHabit,
    del,
  };
};
