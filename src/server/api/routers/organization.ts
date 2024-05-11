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
        // Create the organization
        const newOrganization = await prisma.organization.create({
          data: input,
        });

        // Associate the user with the new organization and mark them as owner
        await prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            organizationId: newOrganization.id,
            isOrganizationOwner: true,
          },
        });

        // Return the new organization
        return newOrganization;
      });

      return organization;
    }),
});
