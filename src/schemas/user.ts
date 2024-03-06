import { z } from "zod";

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  HRADMIN = "HRADMIN",
  SUPERADMIN = "SUPERADMIN",
}

export const createUserSchema = z
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
    role: z.enum(["EMPLOYEE", "HRADMIN"]).optional().default("EMPLOYEE"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type createUserSchema = z.TypeOf<typeof createUserSchema>;
