import express from "express";
import dotenv from "dotenv";
import { validate } from "../middlewares/validate";
import RegisterValidation from "../validations/RegisterValidation";
import Auth from "../middlewares/Auth";
import LoginValidation from "../validations/LoginValidation";
import {
  delUser,
  getAllUser,
  getOneUser,
  loginUser,
  registerUser,
} from "../controllers/users";

dotenv.config();
const router = express.Router();

router.post("/register", validate(RegisterValidation), registerUser);

router.post("/login", validate(LoginValidation), loginUser);

router.get("/", Auth, getOneUser);

router.get("/all", Auth, getAllUser);

router.delete("/me", Auth, delUser);

export default router;
