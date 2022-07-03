import { GetState, SetState } from "zustand"
import { TProduct, TProducts } from "../src/server/routers/product"

export interface CartSlice {
  state: "idle" | "fetching" | "error"
  cart: { product: TProduct; quantity: number }[]
}

const createProductSlice = (
  set: SetState<CartSlice>,
  get: GetState<CartSlice>
) => ({
  cart: [] as CartSlice["cart"],

  addProduct: (product: TProduct) =>
    set(state => ({
      cart: [...state.cart, { product, quantity: 1 }],
    })),

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
