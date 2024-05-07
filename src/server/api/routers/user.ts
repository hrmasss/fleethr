import { CreateUserSchema } from "@/schemas/user";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { hash } from "bcryptjs";
export const userRouter = createTRPCRouter({
  createNew: publicProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if there's no user in session

      if (ctx.session?.user)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Alredy signed in to an account.",
        });

      // Check if the provided email is already in use
      const user = await ctx.db.user.findFirst({
        where: { email: input.email },
      });

      if (user)
        throw new TRPCError({
          code: "CONFLICT",
          message: `${input.email} is already in use!`,
        });

      // Hash the password
      const hashedPassword = await hash(input.password, 8);

      // Create the user
      const newUser = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      return { ...newUser, password: null };
    }),

  addUserToOrganization: protectedProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if the creator has an organization before adding users
      const creator = await ctx.db.user.findFirst({
        where: { id: ctx.session.user.id },
        include: { organization: true },
      });

      if (!creator?.organization)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "No organization found. Create an organization before adding people.",
        });

      // Check if the provided email is already in use
      const user = await ctx.db.user.findFirst({
        where: { email: input.email },
      });

      if (user)
        throw new TRPCError({
          code: "CONFLICT",
          message: `${input.email} is already in use!`,
        });

      // Hash the password
      const hashedPassword = await hash(input.password, 8);

      // Create the user
      const newUser = await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          role: input.role,
          organization: { connect: { id: creator.organization.id } },
        },
      });

      return { ...newUser, password: null };
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });

    if (!user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User does not exist.",
      });

    return user;
  }),
});
