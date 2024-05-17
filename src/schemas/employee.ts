import { z } from "zod";

// Common schemas
const requiredString = z.string().min(1, { message: "Required" });
const optionalString = z.string().optional();

const id = requiredString;
const employeeId = requiredString;
const jobTitle = requiredString;
const departmentId = requiredString;
const name = optionalString;
const phone = optionalString;
const idVerificationDoc = optionalString;
const idVerificationStatus = optionalString;
const presentAddress = optionalString;
const permanentAddress = optionalString;
const email = z.string().email("Invalid email");

export const CreateEmployee = z.object({
  employeeId,
  name,
  email,
  jobTitle,
  departmentId,
  phone,
  presentAddress,
  permanentAddress,
  idVerificationDoc,
  idVerificationStatus,
});
export const GetEmployee = z.object({ id });
export const UpdateEmployee = GetEmployee.merge(CreateEmployee);

export type CreateEmployee = z.infer<typeof CreateEmployee>;
export type GetEmployee = z.infer<typeof GetEmployee>;
export type UpdateEmployee = z.infer<typeof UpdateEmployee>;
