import { z } from "zod";

const requiedString = z.string().min(1, { message: "Required" });
const currentOrFutureDate = z.date().refine(
  (value) => {
    // Just compare the date ignoring time
    const today = new Date().setHours(0, 0, 0, 0);
    const valueDate = value.setHours(0, 0, 0, 0);

    return valueDate >= today;
  },
  { message: "Invalid date" },
);

const id = z.string();
const employeeId = z.string();
const leaveType = requiedString;
const startDate = currentOrFutureDate;
const endDate = currentOrFutureDate;
const reason = requiedString;
const status = z.enum(["pending", "approved", "rejected"]);

export const GetLeaveApplication = z.object({ id });
export const CreateLeaveApplication = z
  .object({
    employeeId,
    leaveType,
    startDate,
    endDate,
    reason,
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be greater than or equal to start date",
    path: ["endDate"],
  });
export const UpdateLeaveApplication = z
  .object({
    id,
    employeeId,
    leaveType,
    startDate,
    endDate,
    reason,
    status,
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be greater than or equal to start date",
    path: ["endDate"],
  });

export type CreateLeaveApplication = z.infer<typeof CreateLeaveApplication>;
export type GetLeaveApplication = z.infer<typeof GetLeaveApplication>;
export type UpdateLeaveApplication = z.infer<typeof UpdateLeaveApplication>;
