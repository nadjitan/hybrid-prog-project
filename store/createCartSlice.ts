import { GetState, SetState } from "zustand"
import { TProducts } from "../src/server/routers/product"

export interface CartSlice {
  state: "idle" | "fetching" | "error"
  cart: TProducts
}

const createProductSlice = (
  set: SetState<CartSlice>,
  get: GetState<CartSlice>
) => ({
  cart: [],
})

export default createProductSlice
