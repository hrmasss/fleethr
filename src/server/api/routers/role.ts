import { createTRPCRouter, organizationProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { CreateRole, UpdateRole, GetRole } from "@/schemas/role";

export const roleRouter = createTRPCRouter({
  // *Create a new role
  create: organizationProcedure
    .input(CreateRole)
    .mutation(async ({ ctx, input }) => {
      const existingRoleName = await ctx.db.role.findFirst({
        where: { organizationId: ctx.organization.id, name: input.name },
      });

      // Check if a role with same name already exist
      if (existingRoleName)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A role with the same name already exist",
        });

      // Get the permissions based on their IDs
      const permissions = await ctx.db.action.findMany({
        where: {
          id: { in: input.permissionIds },
        },
      });

      // Check if all permissions exist
      if (permissions.length !== input.permissionIds.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Some permissions don't exist",
        });
      }

      return await ctx.db.role.create({
        data: {
          organization: { connect: { id: ctx.organization.id } },
          name: input.name,
          description: input.description,
          permissions: {
            connect: permissions.map((permission) => ({ id: permission.id })),
          },
        },
      });
    }),

  // *Update an existing role
  update: organizationProcedure
    .input(UpdateRole)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.role
        .findUniqueOrThrow({
          where: { organizationId: ctx.organization.id, id: input.id },
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Role doesn't exist",
          });
        });

      const existingRoleName = await ctx.db.role.findFirst({
        where: {
          organizationId: ctx.organization.id,
          name: input.name,
        },
      });

      // Check if a role with same name already exist
      if (existingRoleName)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A role with the same name already exist",
        });

      // Get the permissions based on their IDs
      const permissions = await ctx.db.action.findMany({
        where: {
          id: { in: input.permissionIds },
        },
      });

      // Check if all permissions exist
      if (permissions.length !== input.permissionIds.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Some permissions don't exist",
        });
      }

      return await ctx.db.role.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          permissions: {
            connect: permissions.map((permission) => ({ id: permission.id })),
          },
        },
      });
    }),

  // *Delete an existing role
  delete: organizationProcedure
    .input(GetRole)
    .mutation(async ({ ctx, input }) => {
      // See if the role exists
      await ctx.db.role
        .findUniqueOrThrow({
          where: { id: input.id, organizationId: ctx.organization.id },
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Role doesn't exist",
          });
        });

      // Delete the role
      return ctx.db.role.delete({
        where: { id: input.id },
      });
    }),

  // *Get a single role
  get: organizationProcedure.input(GetRole).query(async ({ ctx, input }) => {
    return ctx.db.role.findUnique({
      where: { id: input.id, organizationId: ctx.organization.id },
    });
  }),

  // *Get all roles
  getAll: organizationProcedure.query(async ({ ctx }) => {
    return ctx.db.role.findMany({
      where: { organizationId: ctx.organization.id },
    });
  }),
});
