import { GetState, SetState } from "zustand"
import { TProduct, TProducts } from "../src/server/routers/product"

export interface CartSlice {
  state: "idle" | "fetching" | "error"
  cart: { product: TProduct; count: number }[]
}

const createProductSlice = (
  set: SetState<CartSlice>,
  get: GetState<CartSlice>
) => ({
  cart: [],
  addProduct: (product: TProduct) =>
    set(state => ({
      cart: [...state.cart, { product, count: 1 }],
    })),
  removeProduct: (id: string) =>
    set(state => ({
      cart: state.cart.filter(({ product }) => product.id !== id),
    })),
  incrementCount: (id: string) =>
    set(state => ({
      cart: state.cart.map(({ product, count }) => {
        if (product.id === id) {
          return { product, count: count + 1 }
        }

        return { product, count }
      }),
    })),
  decrementCount: (id: string) =>
    set(state => ({
      cart: state.cart.map(({ product, count }) => {
        if (product.id === id) {
          if (count > 1) return { product, count: count - 1 }
        }

        return { product, count }
      }),
    })),
})

export default createProductSlice
