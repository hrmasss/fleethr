import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
