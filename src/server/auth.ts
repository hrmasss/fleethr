import { type Adapter } from "next-auth/adapters";
import type { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/server/db";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

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
      email: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    email: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    email: string;
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },

    jwt: async ({ token }) => {
      const userRole = await getUserRole(token.sub);

      token.role = userRole;
      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
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

// Utility function for getting user role
export async function getUserRole(userId?: string): Promise<UserRole> {
  "use server";

  if (!userId) return "BASE";

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role ?? "BASE";
}
