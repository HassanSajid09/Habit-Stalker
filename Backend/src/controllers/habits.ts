import { Request, Response } from "express";
import { Habits } from "../models/Habits";

export const createHabit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  const userId = (req.user as { id: string }).id;
  try {
    const habit = await Habits.findOneAndUpdate(
      { user: userId, title: data.title },
      { $set: { ...data, user: userId } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Habit created Successfully", habit });
  } catch (err) {
    res.status(500).json({ message: "Error creating Habit", err });
    console.log("Error:", err);
  }
};

export const getOneHabit = async (req: Request, res: Response) => {
  try {
    const habit = await Habits.findById({
      _id: req.params.id,
      user: (req.user as { id: string }).id,
    });

    if (!habit) {
      res.status(404).json({ message: "Habit not found" });
      return;
    }

    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
    console.log(err);
  }
};

export const getAllHabits = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: string }).id;

    const habits = await Habits.find({ user: userId });

    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};

export const getHabitByCategory = async (req: Request, res: Response) => {
  try {
    const habits = await Habits.find({
      user: req.user?.id,
      category: req.params.category,
    });
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};

export const getHabitByPriority = async (req: Request, res: Response) => {
  try {
    const habits = await Habits.find({
      user: req.user?.id,
      priority: req.params.priority,
    });

    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};

export const delHabit = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: string }).id;
    const habitId = req.params.id;

    const habit = await Habits.findOneAndDelete({
      _id: habitId,
      user: userId,
    });

    if (!habit) {
      res.status(404).json({ message: "Habit not Found" });
      return;
    }

    res.status(200).json({ message: "Habit deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};
