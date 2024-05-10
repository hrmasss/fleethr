import { z } from "zod";

export const Credentials = z.object({
  email: z.string().email("Required"),
  password: z.string().min(1, { message: "Required" }),
});

export type Credentials = z.infer<typeof Credentials>;
