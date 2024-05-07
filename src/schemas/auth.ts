import { z } from "zod";

export const CredentialsSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, { message: "Please provide a password" }),
});

export type CredentialsSchema = z.TypeOf<typeof CredentialsSchema>;
