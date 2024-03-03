import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
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
});
