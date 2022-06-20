import * as trpcNext from "@trpc/server/adapters/next"
import superjson from "superjson"
import { z } from "zod"
import { createContext } from "../../../server/context"
import { createRouter } from "../../../server/create-router"

let products: Product[] = []

const Product = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  inStock: z.boolean(),
  category: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
const Products = z.array(Product)

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
  .query("getProducts", {
    output: Products,
    async resolve() {
      if (products.length === 0) {
        products.push({
          id: "123",
          name: "Soap",
          price: 100,
          description: "A soap",
          image:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
          inStock: true,
          category: "cleaning",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
      return products
    },
  })
  .query("productsList", {
    output: Products,
    resolve() {
      return products
    },
  })
// .query("example", {
//   async resolve({ ctx: { prisma } }) {
//     return await prisma.example.findMany();
//   },
// })
// .mutation("create-example", {
//   async resolve({ ctx: { prisma } }) {
//     return await prisma.example.create({ data: {} });
//   },
// });

export type Product = z.infer<typeof Product>
export type Products = z.infer<typeof Products>

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
})
