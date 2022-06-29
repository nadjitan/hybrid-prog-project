import { createRouter } from "../create-router"
import { z } from "zod"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { firestoreDB } from "../../../firebaseConfig"

let products: TProducts = []

export const Product = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  inStock: z.boolean(),
  category: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
const Products = z.array(Product)

const productsCollection = collection(firestoreDB, "products")

export const productRouter = createRouter()
  .query("fetchAll", {
    async resolve() {
      await getDocs(productsCollection).then(data => {
        products = data.docs.map(item => {
          return { ...item.data(), id: item.id } as TProduct
        })
      })
    },
  })
  .query("list", {
    output: Products,
    resolve() {
      return products
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      await deleteDoc(doc(firestoreDB, "products", input.id)).then(d =>
        console.log(d)
      )
    },
  })
  .mutation("create", {
    input: z.object({ product: Product }),
    async resolve({ input }) {
      await addDoc(productsCollection, input.product).then(d => console.log(d))
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
      ).then(d => console.log(d))
    },
  })

export type TProduct = z.infer<typeof Product>
export type TProducts = z.infer<typeof Products>
