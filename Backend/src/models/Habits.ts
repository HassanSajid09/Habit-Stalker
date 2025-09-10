import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

interface Habits extends Document {
  title: string;
  description: string;
  frequency: "daily" | "weekly";
  priority: "important" | "moderate" | "low";
  category: string;
  user: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const Habit = new mongoose.Schema<Habits>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["important", "moderate", "low"],
      default: "moderate",
    },
    category: {
      type: String,
      default: "General",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export const Habits: Model<Habits> = mongoose.model("Habits", Habit);
