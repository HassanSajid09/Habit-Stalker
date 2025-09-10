import express from "express";
import Auth from "../middlewares/Auth";
import { validate } from "../middlewares/validate";
import { habitValidation } from "../validations/HabitsValidation";
import {
  createHabit,
  delHabit,
  getAllHabits,
  getHabitByCategory,
  getHabitByPriority,
  getOneHabit,
} from "../controllers/habits";

const router = express.Router();

router.post("/", Auth, validate(habitValidation), createHabit);

router.get("/:id", Auth, getOneHabit);

router.get("/", Auth, getAllHabits);

router.get("/category/:category", Auth, getHabitByCategory);

router.get("/priority/:priority", Auth, getHabitByPriority);

router.delete("/:id", Auth, delHabit);

export default router;
