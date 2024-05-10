import { z } from "zod";

// User model fields
const id = z.string();
const name = z.string().optional();
const image = z.string().optional();
const email = z.string().email("Invalid email");
const password = z.string().min(8, { message: "Minimum 8 characters" });

export const CreateUser = z
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

export const UpdateUser = z.object({ id, name, image, email });

export type CreateUser = z.infer<typeof CreateUser>;
export type UpdateUser = z.infer<typeof UpdateUser>;
