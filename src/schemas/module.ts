import { z } from "zod";
import { maxSize } from "@/schemas/organization";
import { modules as modulesId } from "@/schemas/subscription";

export const GetModules = z.object({ modulesId });
export const GetMonthlyCharge = z.object({ modulesId, maxSize });

export type GetModules = z.infer<typeof GetModules>;
export type GetMonthlyCharge = z.infer<typeof GetMonthlyCharge>;
