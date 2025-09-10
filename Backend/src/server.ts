import type {} from "./types/express/index";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDb from "./config/db";
import users from "./routes/users";
import habits from "./routes/habits";
import habitProgress from "./routes/habitProgress";
import Auth from "./middlewares/Auth";

dotenv.config();
const app = express();
ConnectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use("/users", users);
app.use("/habit", habits);
app.use("/habits", habitProgress);

app.listen(process.env.PORT, () => {
  console.log(`Server started at Port: ${process.env.PORT}`);
});
