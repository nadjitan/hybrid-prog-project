import { createRouter } from "../create-router"
import { z } from "zod"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"
import { firestoreDB } from "../../../firebaseConfig"

let products: TProducts = []

export const Product = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string(),
  category: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
const Products = z.array(Product)

const productsCollection = collection(firestoreDB, "products")

export const productRouter = createRouter()
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      await deleteDoc(doc(firestoreDB, "products", input.id)).then(
        () => (products = products.filter(prod => prod.id !== input.id))
      )
    },
  })
  .mutation("create", {
    input: z.object({ product: Product }),
    output: z.object({ id: z.string() }),
    async resolve({ input }) {
      return {
        id: (await addDoc(productsCollection, input.product)).id,
      }
    },
  })
  .mutation("edit", {
    input: z.object({
      id: z.string(),
      product: Product,
    }),
    async resolve({ input }) {
      await updateDoc(
        doc(firestoreDB, "products", input.id),
        input.product
      )
    },
  })

export type TProduct = z.infer<typeof Product>
export type TProducts = z.infer<typeof Products>
