import z from "zod";

export const loginValidation = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});
