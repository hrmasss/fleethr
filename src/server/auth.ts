import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@/schemas/user";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import type { DiscordProfile } from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      let userRole = UserRole.EMPLOYEE;
      if (session.user && token.sub) {
        const user = await db.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        });
        if (user) userRole = user.role as UserRole;
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: userRole,
        },
      };
    },

    jwt: async ({ token }) => {
      let userRole = UserRole.EMPLOYEE;
      if (token.sub) {
        const user = await db.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        });
        if (user) userRole = user.role as UserRole;
      }

      token.role = userRole;
      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // @ts-expect-error Next auth issues with strict mode (See issue #2701 on github)
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user?.password) return null;

        const isValidPassword = await compare(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) return null;

        return {
          ...user,
          password: null,
        };
      },
    }),

    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      profile(profile: DiscordProfile) {
        const role: UserRole = (profile.role as UserRole) ?? UserRole.EMPLOYEE;
        return {
          id: profile.id.toString(),
          name: profile.username,
          email: profile.email,
          image: profile.avatar,
          role,
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
