import { createTRPCRouter, organizationProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  CreateDepartment,
  UpdateDepartment,
  GetDepartment,
} from "@/schemas/department";

export const departmentRouter = createTRPCRouter({
  // *Create a new department
  create: organizationProcedure
    .input(CreateDepartment)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.department.create({
        data: {
          ...input,
          organization: { connect: { id: ctx.organization.id } },
        },
      });
    }),

  // *Update an existing department
  update: organizationProcedure
    .input(UpdateDepartment)
    .mutation(async ({ ctx, input }) => {
      // See if the department exists
      await ctx.db.department
        .findUniqueOrThrow({
          where: { id: input.id, organizationId: ctx.organization.id },
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Department doesn't exist",
          });
        });

      // Update the department
      return ctx.db.department.update({
        where: { id: input.id },
        data: input,
      });
    }),

  // *Delete an existing department
  delete: organizationProcedure
    .input(GetDepartment)
    .mutation(async ({ ctx, input }) => {
      // See if the department exists
      await ctx.db.department
        .findUniqueOrThrow({
          where: { id: input.id, organizationId: ctx.organization.id },
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Department doesn't exist",
          });
        });

      // Delete the department
      return ctx.db.department.delete({
        where: { id: input.id },
      });
    }),

  // *Get a single department
  get: organizationProcedure
    .input(GetDepartment)
    .query(async ({ ctx, input }) => {
      return ctx.db.department.findUnique({
        where: { id: input.id, organizationId: ctx.organization.id },
      });
    }),

  // *Get all departments
  getAll: organizationProcedure.query(async ({ ctx }) => {
    return ctx.db.department.findMany({
      where: { organizationId: ctx.organization.id },
    });
  }),
});
