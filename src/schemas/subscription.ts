import { z } from "zod";

// Subscription model fields
const id = z.string();
export const modules = z
  .array(z.string())
  .refine((value) => value.some((item) => item), {
    message: "No modules selected",
  });
const autoRenewal = z.boolean().optional().default(true);
export const type = z.enum(["MONTHLY", "YEARLY"]).optional().default("MONTHLY");

export const GetSubscription = z.object({ id });
export const CreateSubscription = z.object({ modules, autoRenewal, type });
export const UpdateSubscription = CreateSubscription.merge(GetSubscription);

export type GetSubscription = z.infer<typeof GetSubscription>;
export type CreateSubscription = z.infer<typeof CreateSubscription>;
export type UpdateSubscription = z.infer<typeof UpdateSubscription>;
