import { z } from "zod";

// User model fields
const id = z.string();
const name = z.string().optional();
const image = z.string().optional();
const email = z.string().email("Invalid email");
const password = z.string().min(8, { message: "Minimum 8 characters" });

export const CreateUserSchema = z
  .object({
    name,
    image,
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const UpdateUserSchema = z.object({ id, name, image, email });

export type CreateUserSchema = z.TypeOf<typeof CreateUserSchema>;
export type UpdateUserSchema = z.TypeOf<typeof UpdateUserSchema>;
