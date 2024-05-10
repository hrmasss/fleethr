import { CreateOrganization } from "@/schemas/organization";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
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

      // Create the organization
      const organization = await ctx.db.organization.create({ data: input });

      // Update user role to SUPERADMIN [Complete control to the creator of the organization]
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { role: "SUPERADMIN", organizationId: organization.id },
      });

      return organization;
    }),
});
