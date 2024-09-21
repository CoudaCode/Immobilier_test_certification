import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3, "Username doit être au moins 3 caractères"),
  email: z.string().email("Email est invalide"),
  password: z.string().min(6, "password doit être au moins 6 caractères"),
});

export const LoginSchema = z.object({
  username: z.string().min(3, "Username doit être au moins 3 caractères"),
  password: z.string().min(6, "Password doit être au moins 6 caractères"),
});
