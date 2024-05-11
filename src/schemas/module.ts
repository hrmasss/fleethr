import { z } from "zod";
import { modules as modulesId, durationInMonths } from "@/schemas/subscription";

export const GetModules = z.object({ modulesId });
export const GetSubscriptionCharge = z.object({
  modulesId,
  durationInMonths,
});

export type GetModules = z.infer<typeof GetModules>;
export type GetSubscriptionCharge = z.infer<typeof GetSubscriptionCharge>;
