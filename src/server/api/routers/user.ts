import { CreateUserSchema } from "@/schemas/user";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { hash } from "bcryptjs";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
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
});
