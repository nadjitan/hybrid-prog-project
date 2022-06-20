import { GetState, SetState } from "zustand"
import { Products } from "../src/pages/api/trpc/[trpc]"

export interface CartSlice {
  state: "idle" | "fetching" | "error"
  cart: Products
}

const createProductSlice = (
  set: SetState<CartSlice>,
  get: GetState<CartSlice>
) => ({
  cart: [],
})

export default createProductSlice
