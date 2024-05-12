import { CreateUser } from "@/schemas/user";
import { TRPCError } from "@trpc/server";
import { hash } from "bcryptjs";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(CreateUser).mutation(async ({ ctx, input }) => {
    // Check if there's no user in session

    if (ctx.session?.user)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Existing user in session",
      });

    // Check if the provided email is already in use
    const user = await ctx.db.user.findFirst({
      where: { email: input.email },
    });

    if (user)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `${input.email} is in use`,
      });

    // Check if both the passwords match
    if (input.password !== input.confirmPassword)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Passwords don't match",
      });

    // Hash the password
    const hashedPassword = await hash(input.password, 8);

    // Create the user
    const newUser = await ctx.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
        image: input.image,
      },
    });

    return { ...newUser, password: null };
  }),

  getOrganization: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
      include: {
        organization: {
          include: {
            subscription: true,
          },
        },
      },
    });

    return user?.organization;
  }),

  getPermissions: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });

    return user?.role?.permissions;
  }),
});
