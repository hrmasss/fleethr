import { GetSubscriptionCharge } from "@/schemas/module";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const moduleRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.module.findMany({
      include: {
        dependsOn: true,
        dependedBy: true,
      },
    });
  }),

  getSubscriptionCharge: protectedProcedure
    .input(GetSubscriptionCharge)
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        include: {
          organization: true,
        },
      });

      // Check if user belongs to an organization
      if (!user?.organization)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Organization not found",
        });

      // Get the modules based on their IDs
      const modules = await ctx.db.module.findMany({
        where: {
          id: { in: input.modulesId },
        },
        include: {
          dependsOn: true,
        },
      });

      // Check if all modules exist
      if (modules.length !== input.modulesId.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Some modules don't exist",
        });
      }

      // Check if all dependencies are present
      const missingDependencies = modules.flatMap((module) =>
        module.dependsOn.filter(
          (dependency) => !modules.some((m) => m.id === dependency.id),
        ),
      );

      if (missingDependencies.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Missing dependencies: [${missingDependencies.map((dep) => dep.name).join(", ")}]`,
        });
      }

      // Calculate the total base price
      const totalBasePrice = modules.reduce(
        (sum, module) => sum + module.price,
        0,
      );
      
      return input.subscriptionType === "YEARLY"
        ? totalBasePrice * user.organization.maxSize * 12
        : totalBasePrice * user.organization.maxSize;
    }),
});
