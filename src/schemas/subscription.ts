import { z } from "zod";

export const CreateSubscription = z.object({
  modules: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one module.",
  }),
  type: z.enum(["MONTHLY", "YEARLY"]).optional().default("MONTHLY"),
  autoRenewal: z.boolean().optional().default(false),
});

export type CreateSubscription = z.infer<typeof CreateSubscription>;
