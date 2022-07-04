import { GetState, SetState } from "zustand"
import { TProduct, TProducts } from "../src/server/routers/product"
import { TCartProduct, TReceipts } from "../src/server/routers/receipt"

export interface StoreSlice {
  state: "idle" | "fetching" | "error"
  cart: { product: TCartProduct["product"]; quantity: number }[]
  products: TProducts
  receipts: TReceipts
}

const createProductSlice = (
  set: SetState<StoreSlice>,
  get: GetState<StoreSlice>
) => ({
  cart: [] as StoreSlice["cart"],
  products: [] as TProducts,
  receipts: [] as TReceipts,

  setProducts: (products: TProducts) => set(state => ({ products: products })),
  setReceipts: (receipts: TReceipts) => set(state => ({ receipts: receipts })),
  clearCart: () => set(state => ({ cart: [] })),

  getCartTotal: () =>
    get().cart.reduce(
      (currNum, prod) => currNum + prod.quantity * prod.product.price,
      0
    ),

  addProduct: (newProduct: TProduct) => {
    const { quantity, ...newCartProduct } = newProduct

    if (!get().cart.find(cProd => cProd.product.id === newCartProduct.id)) {
      set(state => ({
        cart: [...state.cart, { product: newCartProduct, quantity: 1 }],
      }))
    } else {
      set(state => ({
        cart: state.cart.map(({ product, quantity }) => {
          if (product.id === newCartProduct.id) {
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
          return { product, quantity: quantity + 1 }
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
