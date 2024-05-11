import { z } from "zod";
import {
  modules as modulesId,
  type as subscriptionType,
} from "@/schemas/subscription";

export const GetModules = z.object({ modulesId });
export const GetSubscriptionCharge = z.object({
  modulesId,
  subscriptionType,
});

export type GetModules = z.infer<typeof GetModules>;
export type GetSubscriptionCharge = z.infer<typeof GetSubscriptionCharge>;
