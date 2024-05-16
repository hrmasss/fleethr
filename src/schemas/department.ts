import { z } from "zod";

const id = z.string();
const name = z.string().min(1, { message: "Required" });
const description = z.string().optional();

export const GetDepartment = z.object({ id });
export const CreateDepartment = z.object({ name, description });
export const UpdateDepartment = CreateDepartment.merge(GetDepartment);

export type CreateDepartment = z.infer<typeof CreateDepartment>;
export type GetDepartment = z.infer<typeof GetDepartment>;
export type UpdateDepartment = z.infer<typeof UpdateDepartment>;
