import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

type CDBUser = {
  id: string
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: CDBUser
  }

  interface User extends CDBUser {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string
    user: CDBUser
  }
}
