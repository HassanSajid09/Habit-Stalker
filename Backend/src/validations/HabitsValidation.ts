import { z } from "zod";

export const habitValidation = z.object({
  title: z
    .string()
    .min(5, "Title is Required")
    .max(20, "Title should be maximum of 20 characters"),
  description: z.string().optional(),
  frequency: z
    .enum(["daily", "weekly"])
    .refine((val) => ["daily", "weekly"].includes(val), {
      message: "Frequency must be either 'daily' or 'weekly'",
    }),
  priority: z
    .enum(["important", "moderate", "low"])
    .refine((val) => ["important", "moderate", "low"].includes(val), {
      message: "Habit's priority must be 'important', 'moderate' or 'low'",
    })
    .optional(),
  category: z.string(),
});
