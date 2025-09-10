import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}
interface LoginForm {
  email: string;
  password: string;
}
interface AuthResponse {
  token: string;
}

const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
};

const registerUser = async (body: RegisterForm) => {
  const res = await axios.post<AuthResponse>("/users/register", body);
  return res.data;
};

const loginUser = async (body: LoginForm) => {
  const res = await axios.post<AuthResponse>("/users/login", body);
  return res.data;
};

export const useAuth = () => {
  const navigate = useNavigate();

  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("User Registered Successfully!");
      navigate("/signin");
    },
    onError: (err: unknown) => {
      if (isAxiosError(err)) {
        toast.error(
          err.response?.status === 400
            ? "User Already Exists!"
            : "Failed to Register!"
        );
      }
    },
  });

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Saving token:", data.token);
      localStorage.setItem("token", data.token);
      console.log("LocalStorage now has:", localStorage.getItem("token"));

      toast.success("User logged in Successfully!");
      navigate("/dashboard");
    },
    onError: (err: unknown) => {
      console.log("❌ Login Error:", err); // 👈 inspect errors too
      if (isAxiosError(err)) {
        toast.error(
          err.response?.status === 400
            ? "Invalid Credentials!"
            : "Failed to Login!"
        );
      }
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Signed Out!");
    navigate("/");
  };

  return { register, login, logout };
};
