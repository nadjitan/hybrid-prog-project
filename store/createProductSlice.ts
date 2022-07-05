import { collection, getDocs } from "firebase/firestore"
import { GetState, SetState } from "zustand"
import { firestoreDB } from "../firebaseConfig"
import { TProduct, TProducts } from "../src/server/routers/product"
import {
  TCartProduct,
  TReceipt,
  TReceipts,
} from "../src/server/routers/receipt"

export interface StoreSlice {
  state: "idle" | "fetching" | "error"
  cart: { product: TCartProduct["product"]; quantity: number }[]
  products: TProducts
  receipts: TReceipts
}

const productsCollection = collection(firestoreDB, "products")
const receiptssCollection = collection(firestoreDB, "receipts")

const createProductSlice = (
  set: SetState<StoreSlice>,
  get: GetState<StoreSlice>
) => ({
  cart: [] as StoreSlice["cart"],
  products: [] as TProducts,
  receipts: [] as TReceipts,

  getProducts: () => get().products,

  fetchProdsRecs: async () => {
    await getDocs(productsCollection).then(data => {
      let products = data.docs.map(item => {
        return { ...item.data(), id: item.id } as TProduct
      })
      set(state => ({ products }))
    })

    await getDocs(receiptssCollection).then(data => {
      let receipts = data.docs.map(item => {
        return { ...item.data(), id: item.id } as TReceipt
      })
      set(state => ({ receipts }))
    })
  },

  setProducts: (products: TProducts) => set(state => ({ products })),
  setReceipts: (receipts: TReceipts) => set(state => ({ receipts })),
  clearCart: () => set(state => ({ cart: [] })),

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
