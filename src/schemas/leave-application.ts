import { z } from "zod";

const requiedString = z.string().min(1, { message: "Required" });
const futureDate = z.date().refine((value) => value <= new Date(), {
  message: "Invalid date",
});

const id = z.string();
const employeeId = z.string();
const leaveType = requiedString;
const startDate = futureDate;
const endDate = futureDate;
const reason = requiedString;
const status = z.enum(["pending", "approved", "rejected"]);

export const CreateLeaveApplication = z.object({
  employeeId,
  leaveType,
  startDate,
  endDate,
  reason,
});
export const GetLeaveApplication = z.object({ id });
export const UpdateLeaveApplication = CreateLeaveApplication.merge(
  GetLeaveApplication,
).merge(z.object({ status }));

export type CreateLeaveApplication = z.infer<typeof CreateLeaveApplication>;
export type GetLeaveApplication = z.infer<typeof GetLeaveApplication>;
export type UpdateLeaveApplication = z.infer<typeof UpdateLeaveApplication>;
