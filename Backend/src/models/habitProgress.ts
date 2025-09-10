import mongoose, { Schema, Document, Model, ObjectId, mongo } from "mongoose";

interface habitProgress extends Document {
  habit: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  date: Date;
  completed: Boolean;
}

const HabitProgress = new Schema<habitProgress>(
  {
    habit: {
      type: Schema.Types.ObjectId,
      ref: "Habits",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

HabitProgress.index({ habit: 1, user: 1, date: 1 }, { unique: true });

export const HabitsProgress: Model<habitProgress> = mongoose.model(
  "HabitProgress",
  HabitProgress
);
