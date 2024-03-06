import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, { message: "Please provide a password" }),
});

export type credentialsSchema = z.TypeOf<typeof credentialsSchema>;
