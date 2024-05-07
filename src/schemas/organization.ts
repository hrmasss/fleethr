import { z } from "zod";

export const CreateOrganizationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255),
  maxSize: z.enum(["20", "100", "500"]),
  description: z.string().optional(),
});

export type CreateOrganizationSchema = z.TypeOf<
  typeof CreateOrganizationSchema
>;
