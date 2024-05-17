import {
  CreateEmployee,
  GetEmployee,
  UpdateEmployee,
} from "@/schemas/employee";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, organizationProcedure } from "@/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  // *Create a new employee
  create: organizationProcedure
    .input(CreateEmployee)
    .mutation(async ({ ctx, input }) => {
      const existingEmployeeId = await ctx.db.employee.findFirst({
        where: {
          organizationId: ctx.organization.id,
          employeeId: input.employeeId,
        },
      });

      // Check if a employee with same employee ID already exist
      if (existingEmployeeId)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A employee with the same employee ID already exist",
        });

      const existingEmployeeEmail = await ctx.db.employee.findFirst({
        where: { organizationId: ctx.organization.id, email: input.email },
      });

      // Check if a employee with same email already exist
      if (existingEmployeeEmail)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A employee with the email already exist",
        });

      return await ctx.db.employee.create({
        data: {
          ...input,
          departmentId: undefined,
          department: { connect: { id: input.departmentId } },
          organization: { connect: { id: ctx.organization.id } },
        },
      });
    }),

  // *Update an existing employee
  update: organizationProcedure
    .input(UpdateEmployee)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.employee
        .findUniqueOrThrow({
          where: { organizationId: ctx.organization.id, id: input.id },
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Employee doesn't exist",
          });
        });

      const existingEmployeeId = await ctx.db.employee.findFirst({
        where: {
          organizationId: ctx.organization.id,
          employeeId: input.employeeId,
        },
      });

      // Check if a employee with same employee ID already exist
      if (existingEmployeeId)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A employee with the same employee ID already exist",
        });

      const existingEmployeeEmail = await ctx.db.employee.findFirst({
        where: { organizationId: ctx.organization.id, email: input.email },
      });

      // Check if a employee with same employee ID already exist
      if (existingEmployeeEmail)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A employee with the email already exist",
        });

      return await ctx.db.employee.update({
        where: { id: input.id },
        data: {
          ...input,
          departmentId: undefined,
          department: { connect: { id: input.departmentId } },
        },
      });
    }),

  // *Delete an existing employee
  delete: organizationProcedure
    .input(GetEmployee)
    .mutation(async ({ ctx, input }) => {
      // See if the employee exists
      await ctx.db.employee
        .findUniqueOrThrow({
          where: { id: input.id, organizationId: ctx.organization.id },
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Employee doesn't exist",
          });
        });

      // Delete the employee
      return ctx.db.employee.delete({
        where: { id: input.id },
      });
    }),

  // *Get a single employee
  get: organizationProcedure
    .input(GetEmployee)
    .query(async ({ ctx, input }) => {
      return ctx.db.employee.findUnique({
        where: { id: input.id, organizationId: ctx.organization.id },
      });
    }),

  // *Get all employees
  getAll: organizationProcedure.query(async ({ ctx }) => {
    return ctx.db.employee.findMany({
      where: { organizationId: ctx.organization.id },
    });
  }),
});
