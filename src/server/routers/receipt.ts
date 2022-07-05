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
import { Product } from "./product"

const CartProduct = z.object({
  quantity: z.number(),
  product: Product,
})

const Receipt = z.object({
  id: z.string().optional(),
  products: z.array(CartProduct),
  total: z.number(),
  cashier: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
const Receipts = z.array(Receipt)

const receiptssCollection = collection(firestoreDB, "receipts")

export const receiptRouter = createRouter()
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      await deleteDoc(doc(firestoreDB, "receipts", input.id)).then(d =>
        console.log(d)
      )
    },
  })
  .mutation("create", {
    input: z.object({ receipt: Receipt }),
    async resolve({ input }) {
      await addDoc(receiptssCollection, input.receipt).then(d => console.log(d))
    },
  })
  .mutation("edit", {
    input: z.object({
      id: z.string(),
      receipt: Receipt,
    }),
    async resolve({ input }) {
      await updateDoc(
        doc(firestoreDB, "receipts", input.id),
        input.receipt
      ).then(d => console.log(d))
    },
  })

export type TReceipt = z.infer<typeof Receipt>
export type TReceipts = z.infer<typeof Receipts>
export type TCartProduct = z.infer<typeof CartProduct>
