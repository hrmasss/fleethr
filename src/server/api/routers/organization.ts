import { createOrganizationSchema } from "@/schemas/organization";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createOrganizationSchema)
    .mutation(async ({ ctx, input }) => {
      // Create the organization
      const organization = await ctx.db.organization.create({
        data: { ...input, maxSize: parseInt(input.maxSize) },
      });

      // Update user role to SUPERADMIN [Complete control to the creator of the organization]
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { role: "SUPERADMIN", organizationId: organization.id },
      });

      return organization;
    }),
});
