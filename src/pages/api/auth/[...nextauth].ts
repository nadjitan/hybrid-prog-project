import NextAuth from "next-auth"
import { prisma } from "../../../server/db"
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma as PrismaClient),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findFirst({
          where: {
            username: credentials!.username,
            password: credentials!.password,
          },
        })

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.JWT_SECRET,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        // session.id = token.id
        session.user = token.user
      }
      return session
    },
  },
})
