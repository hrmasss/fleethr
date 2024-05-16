import { z } from "zod";

const id = z.string();
const name = z.string().min(1, { message: "Required" });
const description = z.string().optional();
const permissionIds = z
  .array(z.string())
  .transform((tags) => [...new Set(tags)])
  .default([]);

export const CreateRole = z.object({ name, description, permissionIds });
export const GetRole = z.object({ id });
export const UpdateRole = CreateRole.merge(GetRole);

export type CreateRole = z.infer<typeof CreateRole>;
export type GetRole = z.infer<typeof GetRole>;
export type UpdateRole = z.infer<typeof UpdateRole>;
