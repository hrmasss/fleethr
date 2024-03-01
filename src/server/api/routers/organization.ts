import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

const organizationData = z.object({
  name: z.string().min(1).max(255),
  maxSize: z.number().int().min(20).max(1000),
  description: z.string().min(12),
});

export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(organizationData)
    .mutation(async ({ ctx, input }) => {
      // Create the organization
      const organization = await ctx.db.organization.create({
        data: input,
      });

      // Update user role to SUPERADMIN [Complete control to the creator of the organization]
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { role: "SUPERADMIN", organizationId: organization.id },
      });

      return organization;
    }),
});
