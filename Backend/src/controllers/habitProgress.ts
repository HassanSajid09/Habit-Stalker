import { Request, Response } from "express";
import { Habits } from "../models/Habits";
import { HabitsProgress } from "../models/habitProgress";

export const checkInToHabit = async (req: Request, res: Response) => {
  const userId = (req.user as { id: string }).id;
  const habitId = req.params.id;

  try {
    const habit = await Habits.findOne({ _id: habitId, user: userId });
    if (!habit) {
      res.status(404).json({ message: "Habit not Found" });
      return;
    }

    let startDate: Date;
    let endDate: Date;

    if (habit.frequency === "daily") {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
    } else if (habit.frequency === "weekly") {
      const today = new Date();
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate()) - today.getDay();
      firstDayOfWeek.setHours(0, 0, 0, 0);

      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);

      startDate = firstDayOfWeek;
      endDate = lastDayOfWeek;
    } else {
      res.status(400).json({ message: "Invalid Frequency" });
      return;
    }

    const existing = await HabitsProgress.findOne({
      habit: habitId,
      user: userId,
      date: { $gte: startDate, $lt: endDate },
    });

    if (existing) {
      res.status(400).json({
        message:
          habit.frequency === "daily"
            ? "Already marked today"
            : "Already marked this week",
      });
      return;
    }

    const progress = await HabitsProgress.create({
      habit: habitId,
      user: userId,
      date: new Date(),
      completed: true,
    });

    res.status(201).json({
      message:
        habit.frequency === "daily"
          ? "Habit marked done for today"
          : "Habit marked done for this week",
      progress,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getHabitProgress = async (req: Request, res: Response) => {
  const { habitId } = req.params;
  const userId = (req.user as { id: string }).id;

  try {
    const habit = await Habits.findOne({ _id: habitId, user: userId });
    if (!habit) {
      res.status(404).json({ message: "Habit not Found" });
      return;
    }

    const checkIns = await HabitsProgress.find({
      habit: habitId,
      user: userId,
    }).sort({ date: 1 });

    if (!checkIns.length) {
      res.json({
        streak: 0,
        longestStreak: 0,
        completionPercentage: 0,
        history: [],
        boosterMessage: "No check-ins yet. Start growing from Today!",
      });
      return;
    }

    let streak = 0;
    let longestStreak = 0;
    let currentStreak = 1;

    for (let i = 1; i < checkIns.length; i++) {
      const prev = checkIns[i - 1].date;
      const curr = checkIns[i].date;

      if (habit.frequency === "daily") {
        const diff = Math.round(
          (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diff === 1) currentStreak++;
        else currentStreak--;
      } else if (habit.frequency === "weekly") {
        const prevWeek = Math.floor(prev.getTime() / (1000 * 60 * 60 * 24 * 7));
        const currWeek = Math.floor(
          curr.getTime() / (1000 * 60 * 60 * 24 * 27)
        );
        if (currWeek - prevWeek === 1) currentStreak++;
        else currentStreak--;
      }
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    }

    const today = new Date();
    const lastCheckIn = checkIns[checkIns.length - 1].date;
    const diffDays = Math.floor(
      (today.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (
      (habit.frequency === "daily" && diffDays <= 1) ||
      (habit.frequency === "weekly" && diffDays <= 7)
    ) {
      streak = currentStreak;
    } else {
      streak = 0;
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const checkInslast30 = checkIns.filter((ci) => ci.date >= thirtyDaysAgo);
    const completionPercentage = Math.round((checkInslast30.length / 30) * 100);

    const history = checkIns.map((ci) => ci.date.toISOString().split("T")[0]);

    let boosterMessage = "";
    if (streak >= 30) boosterMessage = "🏆 1 month streak! Amazing!";
    else if (streak >= 7) boosterMessage = "🔥 1 week streak! Keep it going!";
    else if (streak > 0)
      boosterMessage = `You are on a ${streak}-day streak! Keep Going!`;

    return res.json({
      streak,
      longestStreak,
      completionPercentage,
      history,
      boosterMessage,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};

export const checkout = async (req: Request, res: Response) => {
  const habitId = req.params.id;
  const userId = (req.user as { id: string }).id;

  try {
    const checkin = await HabitsProgress.findOneAndUpdate(
      { habit: habitId, user: userId },
      { completed: false },
      { new: true }
    );

    if (!checkin) {
      res.status(404).json({ message: "Checkin not found" });
      return;
    }

    res.status(200).json({ message: "Checkout Successfull" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err); 
  }
};
