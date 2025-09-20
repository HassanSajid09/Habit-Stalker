import express from "express";
import Auth from "../middlewares/Auth";
import { validate } from "../middlewares/validate";
import habitProgressValidation from "../validations/HabitProgressValidation";
import {
  checkInToHabit,
  checkout,
  completedHabits,
  getHabitProgress,
} from "../controllers/habitProgress";

const router = express.Router();

router.post(
  "/:id/checkin",
  Auth,
  validate(habitProgressValidation),
  checkInToHabit
);

router.delete("/:id/checkout", Auth, checkout);

router.get("/:habitId/progress", Auth, getHabitProgress);

router.get("/progress", Auth, completedHabits);

export default router;
