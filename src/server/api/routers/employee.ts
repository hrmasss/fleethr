import {
  CreateEmployee,
  GetEmployee,
  UpdateEmployee,
} from "@/schemas/employee";
import { TRPCError } from "@trpc/server";
import { hash } from "bcryptjs";
import { generateRandomPassword } from "@/lib/utils";
import { createTRPCRouter, organizationProcedure } from "@/server/api/trpc";
import {
  checkUniqueEmployeeId,
  checkUniqueEmployeeEmail,
  sendOnboardingEmail,
} from "@/server/api/helpers/employee";

export const employeeRouter = createTRPCRouter({
  // *Create a new employee
  create: organizationProcedure
    .input(CreateEmployee)
    .mutation(async ({ ctx, input }) => {
      const { departmentId, ...data } = input;

      const { employee, user, randomPassword } = await ctx.db.$transaction(
        async (db) => {
          await checkUniqueEmployeeId(db, ctx.organization.id, data.employeeId);
          await checkUniqueEmployeeEmail(db, ctx.organization.id, data.email);

          // Check if the provided email is already in use
          const existingUser = await db.user.findFirst({
            where: { email: input.email },
          });

          if (existingUser) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `${input.email} is in use`,
            });
          }

          // Generate a random password
          const randomPassword = generateRandomPassword(8);

          // Hash the password
          const hashedPassword = await hash(randomPassword, 8);

          // Create the employee record
          const employee = await db.employee.create({
            data: {
              ...data,
              department: { connect: { id: departmentId } },
              organization: { connect: { id: ctx.organization.id } },
            },
          });

          // Create the user
          const user = await db.user.create({
            data: {
              name: input.name,
              email: input.email,
              password: hashedPassword,
              employeeRecord: { connect: { id: employee.id } },
              organization: { connect: { id: ctx.organization.id } },
            },
          });

          // Return employee, user and random password
          return { employee, user, randomPassword };
        },
      );

      if (user)
        await sendOnboardingEmail({
          email: user.email,
          password: randomPassword,
          name: user.name ?? undefined,
        });

      return employee;
    }),

  // *Update an existing employee
  update: organizationProcedure
    .input(UpdateEmployee)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (db) => {
        await checkUniqueEmployeeId(
          db,
          ctx.organization.id,
          input.employeeId,
          input.id,
        );
        await checkUniqueEmployeeEmail(
          db,
          ctx.organization.id,
          input.email,
          input.id,
        );

        return db.employee.update({
          where: { id: input.id },
          data: {
            ...input,
            departmentId: undefined,
            department: { connect: { id: input.departmentId } },
          },
        });
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

  // *Get self employee record
  getSelf: organizationProcedure.query(async ({ ctx }) => {
    return ctx.db.employee.findFirst({
      where: { user: { id: ctx.session.user.id } },
    });
  }),

  // *Get all employees
  getAll: organizationProcedure.query(async ({ ctx }) => {
    return ctx.db.employee.findMany({
      where: { organizationId: ctx.organization.id },
      include: {
        department: true,
      },
    });
  }),
});
