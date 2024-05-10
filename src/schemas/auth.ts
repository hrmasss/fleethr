import { z } from "zod";

export const CredentialsSchema = z.object({
  email: z.string().email("Required"),
  password: z.string().min(1, { message: "Required" }),
});

export type CredentialsSchema = z.infer<typeof CredentialsSchema>;
