import { z } from "zod";

const RegisterValidation = z.object({
  name: z
    .string()
    .min(5, "Name must consist atleast 5 character")
    .max(15, "Name should consist maximum of 15 characters")
    .nonempty("Name is required"),
  email: z.email().nonempty("Email is Required"),
  password: z
    .string()
    .min(6, "Password should consist atleast 6 characters")
    .max(20, "Password should consist maximum of 20 characters")
    .nonempty("Password is required"),
});

export default RegisterValidation;
