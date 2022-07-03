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
import { Product } from "./product"

let receipts: TReceipts = []

const CartProduct = z.object({
  id: z.number(),
  quantity: z.number(),
  product: Product
})

const Receipt = z.object({
  id: z.string(),
  products: z.array(CartProduct),
})
const Receipts = z.array(Receipt)

const receiptssCollection = collection(firestoreDB, "receipts")

export const receiptRouter = createRouter()
  .query("fetchAll", {
    async resolve() {
      await getDocs(receiptssCollection).then(data => {
        receipts = data.docs.map(item => {
          return { ...item.data(), id: item.id } as TReceipt
        })
      })
    },
  })
  .query("list", {
    output: Receipts,
    resolve() {
      return receipts
    },
  })
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
  .mutation("add", {
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

type TReceipt = z.infer<typeof Receipt>
type TReceipts = z.infer<typeof Receipts>
