import { z } from "zod";

// User model fields
const id = z.string();
const name = z.string().min(3, { message: "Minimum 3 characters" });
const description = z.string().optional();
export const maxSize = z
  .number()
  .int()
  .min(5, { message: "Minimum 5 members" })
  .max(500, { message: "Maximum 500 members" });

export const GetOrganization = z.object({ id });
export const CreateOrganization = z.object({ name, description, maxSize });
export const UpdateOrganization = CreateOrganization.merge(GetOrganization);

export type CreateOrganization = z.infer<typeof CreateOrganization>;
export type GetOrganization = z.infer<typeof GetOrganization>;
export type UpdateOrganization = z.infer<typeof UpdateOrganization>;
