import { z } from "zod";

const LoginValidation = z.object({
  email: z.email().nonempty("Email is Required"),
  password: z
    .string()
    .min(6, "Password should consist atleast 6 characters")
    .max(20, "Password should consist maximum of 20 characters")
    .nonempty("Password is required"),
});

export default LoginValidation;
