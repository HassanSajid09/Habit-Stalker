import mongoose, { Document, Model, mongo } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  date: Date;
}

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const User: Model<User> = mongoose.model("User", UserSchema);
