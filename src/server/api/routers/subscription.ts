import { CreateSubscription } from "@/schemas/subscription";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const subscriptionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateSubscription)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        include: {
          organization: {
            include: {
              subscription: true,
            },
          },
        },
      });

      // Check if a subscription already exist
      if (user?.organization?.subscription)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A subscription already exist",
        });

      // Get the modules based on their IDs
      const modules = await ctx.db.module.findMany({
        where: {
          id: { in: input.modules },
        },
        include: {
          dependsOn: true,
        },
      });

      // Check if all modules exist
      if (modules.length !== input.modules.length) {
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

      // Calculate end date based on duration (months)
      const startingDate = new Date();

      const endDate = new Date(
        startingDate.getTime() +
          input.durationInMonths * 30 * 24 * 60 * 60 * 1000,
      );

      // Create the subscription
      return await ctx.db.subscription.create({
        data: {
          organization: { connect: { id: user?.organization?.id } },
          modules: { connect: modules.map((module) => ({ id: module.id })) },
          durationInMonths: input.durationInMonths,
          isAutoRenewEnabled: input.isAutoRenewEnabled,
          startingDate,
          endDate,
        },
      });
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        organization: {
          include: {
            subscription: true,
          },
        },
      },
    });

    return user?.organization?.subscription;
  }),

  getSubscribedModules: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        organization: {
          include: {
            subscription: {
              include: {
                modules: true,
              },
            },
          },
        },
      },
    });

    return user?.organization?.subscription?.modules;
  }),
});
