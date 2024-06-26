import {
  createTRPCRouter,
  organizationProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  CreateNotice,
  GetNotice,
  UpdateNotice,
  GetPublicNotice,
  GetAllPublicNotices,
} from "@/schemas/notice";

export const noticeRouter = createTRPCRouter({
  // *Create a new notice
  create: organizationProcedure
    .input(CreateNotice)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.notice.create({
        data: {
          ...input,
          organization: { connect: { id: ctx.organization.id } },
        },
      });
    }),

  // *Update an existing notice
  update: organizationProcedure
    .input(UpdateNotice)
    .mutation(async ({ ctx, input }) => {
      // See if the notice exists
      await ctx.db.notice
        .findUniqueOrThrow({ where: { id: input.id } })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Notice doesn't exist",
          });
        });

      // Update the notice
      return ctx.db.notice.update({
        where: { id: input.id },
        data: input,
      });
    }),

  // *Delete an existing notice
  delete: organizationProcedure
    .input(GetNotice)
    .mutation(async ({ ctx, input }) => {
      // See if the notice exists
      await ctx.db.notice
        .findUniqueOrThrow({ where: { id: input.id } })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Notice doesn't exist",
          });
        });

      // Delete the notice
      return ctx.db.notice.delete({ where: { id: input.id } });
    }),

  // *Get a single internal notice
  getInternal: organizationProcedure
    .input(GetNotice)
    .query(async ({ ctx, input }) => {
      return ctx.db.notice.findUnique({
        where: { id: input.id, isPublic: false },
      });
    }),

  // *Get all internal notices
  getAllInternal: organizationProcedure.query(async ({ ctx }) => {
    return ctx.db.notice.findMany({
      where: { isPublic: false, organizationId: ctx.organization.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  // *Get a single public notice
  getPublic: publicProcedure
    .input(GetPublicNotice)
    .query(async ({ ctx, input }) => {
      return ctx.db.notice.findUnique({
        where: {
          organizationId: input.orgId,
          id: input.noticeId,
          isPublic: true,
        },
      });
    }),

  // *Get all public notices
  getAllPublic: publicProcedure
    .input(GetAllPublicNotices)
    .query(async ({ ctx, input }) => {
      return ctx.db.notice.findMany({
        where: {
          organizationId: input.orgId,
          isPublic: true,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  // *Get all notices
  getAll: organizationProcedure.query(async ({ ctx }) => {
    return ctx.db.notice.findMany({
      where: { organizationId: ctx.organization.id },
    });
  }),
});
