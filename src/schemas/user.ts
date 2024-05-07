import { z } from "zod";
import { UserRole } from "@prisma/client";

export const CreateUserSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name is too short" })
      .max(255, { message: "Name is too long" })
      .optional(),
    email: z.string().email("Please provide a valid email"),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z.string(),
    role: z.nativeEnum(UserRole).optional().default("BASE"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type CreateUserSchema = z.TypeOf<typeof CreateUserSchema>;
