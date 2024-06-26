import { z } from "zod";

const id = z.string();
const slug = z.string();
const name = z.string().min(3, { message: "Minimum 3 characters" });
const description = z.string().optional();
export const maxSize = z
  .number()
  .int()
  .min(5, { message: "Minimum 5 members" })
  .max(200, { message: "Maximum 200 members" });

export const GetOrganization = z.object({ id });
export const GetOrganizationBySlug = z.object({ slug });
export const CreateOrganization = z.object({ name, description, maxSize });
export const UpdateOrganization = CreateOrganization.merge(GetOrganization);

export type CreateOrganization = z.infer<typeof CreateOrganization>;
export type GetOrganizationBySlug = z.infer<typeof GetOrganizationBySlug>;
export type GetOrganization = z.infer<typeof GetOrganization>;
export type UpdateOrganization = z.infer<typeof UpdateOrganization>;
