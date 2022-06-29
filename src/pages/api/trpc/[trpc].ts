import * as trpcNext from "@trpc/server/adapters/next"
import superjson from "superjson"
import { z } from "zod"

import { createContext } from "../../../server/context"
import { createRouter } from "../../../server/create-router"
import { productRouter } from "../../../server/routers/product"

export const appRouter = createRouter()
  .transformer(superjson)
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      }
    },
  })
  .merge("product.", productRouter)

// .query("example", {
//   async resolve({ ctx: { prisma } }) {
//     return await prisma.example.findMany()
//   },
// })
// .mutation("create-example", {
//   async resolve({ ctx: { prisma } }) {
//     return await prisma.example.create({ data: {} })
//   },
// })

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error)
    }
  },
})
