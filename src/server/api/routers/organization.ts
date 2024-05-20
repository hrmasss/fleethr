import { CreateOrganization, GetOrganization } from "@/schemas/organization";
import { generateUniqueOrganizationSlug } from "../helpers/organization";
import { defaultRoles } from "prisma/data/role";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateOrganization)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: { id: ctx.session.user.id },
        include: { organization: true },
      });

      // Check if user is already associated with an organization
      if (user?.organization)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Already in an organization.",
        });

      const slug = await generateUniqueOrganizationSlug(ctx.db, input.name);

      // Create the organization and connect the user as the owner & as a member
      const newOrganization = await ctx.db.organization.create({
        data: {
          ...input,
          slug,
          owner: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          members: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      // Check if the organization creation was successful
      if (!newOrganization) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create organization.",
        });
      }

      // Create default roles for the new organization
      await Promise.all(
        defaultRoles.map(async ({ data: role }) => {
          await ctx.db.role.create({
            data: {
              name: role.name,
              description: role.description,
              permissions: role.permissions,
              organizationId: newOrganization.id,
            },
          });
        }),
      );

      return newOrganization;
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        organization: true,
      },
    });

    return user?.organization;
  }),

  getPublicInfo: publicProcedure
    .input(GetOrganization)
    .query(async ({ ctx, input }) => {
      const organization = await ctx.db.organization.findUnique({
        where: { id: input.id },
      });

      return {
        id: organization?.id,
        name: organization?.name,
        description: organization?.description,
      };
    }),
});
