import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { GetMonthlyCharge } from "@/schemas/module";
import { TRPCError } from "@trpc/server";

export const moduleRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.module.findMany({
      include: {
        dependsOn: true,
        dependedBy: true,
      },
    });
  }),

  getMonthlyCharge: publicProcedure
    .input(GetMonthlyCharge)
    .query(async ({ ctx, input }) => {
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

      return totalBasePrice * input.maxSize;
    }),
});
