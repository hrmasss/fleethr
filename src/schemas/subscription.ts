import { z } from "zod";

// Subscription model fields
const id = z.string();
export const modules = z
  .array(z.string())
  .refine((value) => value.some((item) => item), {
    message: "No modules selected",
  });
const isAutoRenewEnabled = z.boolean().optional().default(true);
export const durationInMonths = z.coerce
  .number()
  .int()
  .min(1, { message: "Minimum 1 months" })
  .max(12, { message: "Maximum 12 months" });

export const GetSubscription = z.object({ id });
export const CreateSubscription = z.object({
  modules,
  isAutoRenewEnabled,
  durationInMonths,
});
export const UpdateSubscription = CreateSubscription.merge(GetSubscription);

export type GetSubscription = z.infer<typeof GetSubscription>;
export type CreateSubscription = z.infer<typeof CreateSubscription>;
export type UpdateSubscription = z.infer<typeof UpdateSubscription>;
