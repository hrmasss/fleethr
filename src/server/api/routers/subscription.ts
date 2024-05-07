import { CreateSubscriptionSchema } from "@/schemas/subscription";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const subscriptionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateSubscriptionSchema)
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
          code: "CONFLICT",
          message: "There is already a subscription.",
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
          code: "NOT_FOUND",
          message: "One or more selected modules do not exist.",
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
          message: `The following dependencies are missing: [${missingDependencies.map((dep) => dep.name).join(", ")}]`,
        });
      }

      // Calculate end date based on type
      let endDate;
      if (input.type === "YEARLY") {
        endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
      }

      // Create the subscription
      const subscription = await ctx.db.subscription.create({
        data: {
          organization: { connect: { id: user?.organization?.id } },
          modules: { connect: modules.map((module) => ({ id: module.id })) },
          type: input.type,
          autoRenewal: input.autoRenewal,
          startingDate: new Date(),
          endDate,
        },
      });

      return subscription;
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

    if (!user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User does not exist.",
      });

    return user.organization?.subscription;
  }),
});
