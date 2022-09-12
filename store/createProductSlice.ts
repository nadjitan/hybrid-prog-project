import { collection, getDocs } from "firebase/firestore"
import { GetState, SetState, StateCreator } from "zustand"
import { firestoreDB } from "../firebaseConfig"
import { TProduct, TProducts } from "../src/server/routers/product"
import {
  TCartProduct,
  TReceipt,
  TReceipts,
} from "../src/server/routers/receipt"

const productsCollection = collection(firestoreDB, "products")
const receiptsCollection = collection(firestoreDB, "receipts")

export interface StoreSlice {
  fetchState: "idle" | "fetching" | "error"
  cart: { product: TCartProduct["product"]; quantity: number }[]
  products: TProducts
  receipts: TReceipts
  fetchProducts: () => Promise<void>
  fetchReceipts: () => Promise<void>
  setProducts: (products: TProducts) => void
  setReceipts: (receipts: TReceipts) => void
  clearCart: () => void
  getCartTotal: () => number
  addProduct: (newProduct: TProduct) => void
  removeProduct: (id: string) => void
  incrementQty: (id: string) => void
  decrementQty: (id: string) => void
}

const createProductSlice: StateCreator<StoreSlice> = (set, get) => ({
  fetchState: "idle",
  cart: [],
  products: [],
  receipts: [],

  fetchProducts: async () => {
    set(_ => ({ fetchState: "fetching" }))
    await getDocs(productsCollection).then(data => {
      const newProducts = data.docs.map(item => {
        return { ...item.data(), id: item.id } as TProduct
      })
      set(_ => ({ products: newProducts }))
      set(_ => ({ fetchState: "idle" }))
    })
  },
  fetchReceipts: async () => {
    await getDocs(receiptsCollection).then(data => {
      const newReceipts = data.docs.map(item => {
        return { ...item.data(), id: item.id } as TReceipt
      })
      set(_ => ({ receipts: newReceipts }))
    })
  },

  setProducts: (products: TProducts) => set(_ => ({ products })),
  setReceipts: (receipts: TReceipts) => set(_ => ({ receipts })),
  clearCart: () => set(_ => ({ cart: [] })),

  getCartTotal: () =>
    get().cart.reduce(
      (currNum, prod) => currNum + prod.quantity * prod.product.price,
      0
    ),

  addProduct: (newProduct: TProduct) => {
    if (!get().cart.find(cProd => cProd.product.id === newProduct.id)) {
      set(state => ({
        cart: [...state.cart, { product: newProduct, quantity: 1 }],
      }))
    } else {
      set(state => ({
        cart: state.cart.map(({ product, quantity }) => {
          if (product.id === newProduct.id && quantity < newProduct.quantity) {
            return { product, quantity: quantity + 1 }
          }

          return { product, quantity }
        }),
      }))
    }
  },

  removeProduct: (id: string) =>
    set(state => ({
      cart: state.cart.filter(({ product }) => product.id !== id),
    })),

  incrementQty: (id: string) =>
    set(state => ({
      cart: state.cart.map(({ product, quantity }) => {
        if (product.id === id) {
          if (quantity < product.quantity) {
            return { product, quantity: quantity + 1 }
          }
        }

        return { product, quantity }
      }),
    })),

  decrementQty: (id: string) =>
    set(state => ({
      cart: state.cart.map(({ product, quantity }) => {
        if (product.id === id) {
          if (quantity > 1) return { product, quantity: quantity - 1 }
        }

        return { product, quantity }
      }),
    })),
})

export default createProductSlice
