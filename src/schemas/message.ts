import { z } from "zod";

export const SendMessage = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email" }),
  subject: z
    .string()
    .min(5, { message: "Too short" })
    .max(256, { message: "Too long" }),
  message: z.string().optional(),
});

export type SendMessage = z.infer<typeof SendMessage>;
