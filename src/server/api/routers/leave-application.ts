import { createTRPCRouter, organizationProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  CreateLeaveApplication,
  GetLeaveApplication,
  UpdateLeaveApplication,
} from "@/schemas/leave-application";

export const leaveRouter = createTRPCRouter({
  // *Create a new leave application
  create: organizationProcedure
    .input(CreateLeaveApplication)
    .mutation(async ({ ctx, input }) => {
      const { employeeId, ...data } = input;

      return await ctx.db.leaveApplication.create({
        data: {
          ...data,
          employee: { connect: { id: employeeId } },
        },
      });
    }),

  // *Update an existing leave application
  update: organizationProcedure
    .input(UpdateLeaveApplication)
    .mutation(async ({ ctx, input }) => {
      // See if the leave application exists
      await ctx.db.leaveApplication
        .findUniqueOrThrow({ where: { id: input.id } })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Leave application doesn't exist",
          });
        });

      // Update the leaveApplication
      return ctx.db.leaveApplication.update({
        where: { id: input.id },
        data: input,
      });
    }),

  // *Delete an existing leave application
  delete: organizationProcedure
    .input(GetLeaveApplication)
    .mutation(async ({ ctx, input }) => {
      // See if the leave application exists
      await ctx.db.leaveApplication
        .findUniqueOrThrow({ where: { id: input.id } })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Leave application doesn't exist",
          });
        });

      // Delete the leaveApplication
      return ctx.db.leaveApplication.delete({ where: { id: input.id } });
    }),

  // *Get all leave applications
  getAll: organizationProcedure.query(async ({ ctx }) => {
    return ctx.db.leaveApplication.findMany({
      where: {
        employee: {
          organizationId: ctx.organization.id,
        },
      },
    });
  }),

  // *Get a single leave applications
  get: organizationProcedure
    .input(GetLeaveApplication)
    .query(async ({ ctx, input }) => {
      return ctx.db.leaveApplication.findUnique({
        where: { id: input.id },
      });
    }),
});
