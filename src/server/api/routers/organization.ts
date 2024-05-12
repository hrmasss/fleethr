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

      // Perform the operations within a transaction
      const organization = await ctx.db.$transaction(async (prisma) => {
        // Create the organization and set user as owner
        const newOrganization = await prisma.organization.create({
          data: { ...input, ownerId: ctx.session.user.id },
        });

        // Also set the owner as a member of the organization
        await prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            organizationId: newOrganization.id,
          },
        });

        // Return the new organization
        return newOrganization;
      });

      return organization;
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
});
