import { useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { ReactElement, useEffect, useRef, useState } from "react"
import { useStore } from "../../store/useStore"
import { DeleteIcon, MinusIcon, PlusIcon } from "../components/icons"
import SideNav from "../components/layouts/SideNav"
import { TProducts } from "../server/routers/product"
import { TReceipt } from "../server/routers/receipt"
import { trpc } from "../utils/trpc"
import { NextPageWithLayout } from "./_app"

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    products,
    cart,
    addProduct,
    removeProduct,
    incrementQty,
    decrementQty,
    getCartTotal,
    clearCart,
    fetchProducts,
  } = useStore()
  const [filteredProducts, setFilteredProducts] = useState<TProducts>([])
  const [productsFound, setProductsFound] = useState(true)
  const dropdownElem = useRef<HTMLSelectElement>(null)
  const receiptMutation = trpc.useMutation(["receipt.create"])
  const productMutation = trpc.useMutation(["product.edit"])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])
  useEffect(() => {
    if (productMutation.isSuccess) fetchProducts()
  }, [productMutation.isSuccess])

  const filter = (value: string) => {
    if (value !== "All") {
      setFilteredProducts(products!.filter(prod => prod.category === value))
      if (filteredProducts.length > 0) setProductsFound(true)
      else setProductsFound(false)
    } else {
      setFilteredProducts(products)
      setProductsFound(true)
    }
  }

  const search = (value: string) => {
    if (value !== "") {
      dropdownElem.current!.value = "All"
      setFilteredProducts(
        products!.filter(
          prod =>
            prod.name.toLowerCase().includes(value) ||
            prod.id!.toLowerCase().includes(value)
        )
      )
      if (filteredProducts.length > 0) setProductsFound(true)
      else setProductsFound(false)
    } else {
      setFilteredProducts(products)
      setProductsFound(true)
    }
  }

  const submitReceipt = (receipt: TReceipt) => {
    if (cart.length > 0) {
      receipt.products.map(prod => {
        productMutation.mutate({
          id: prod!.product.id!,
          product: {
            ...prod.product,
            quantity: prod.product.quantity - prod.quantity,
          },
        })
      })

      clearCart()
      receiptMutation.mutate({ receipt })
    } else {
      alert("Please add items in cart first...")
    }
  }
  // const exampleData = trpc.useQuery(["example"]);
  // const { invalidateQueries } = trpc.useContext()

  // createExample.mutate()
  // const createExample = trpc.useMutation("create-example", {
  //   onSuccess: () => invalidateQueries("example"),
  // })

  return (
    <>
      <Head>
        <title>POS System</title>
        <meta name="description" content="Simple & modern POS system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex max-h-screen min-h-screen w-full flex-row bg-theme-background">
        <div className="box-border flex h-full w-full flex-col overflow-hidden pt-[2.8rem] pl-11 pr-11">
          <h3 className="h-max font-poppins-bold text-[1.4rem]">Store</h3>

          <div className="mt-[2.8rem] flex h-14 flex-row">
            <div className="mr-8 flex w-full overflow-hidden rounded-full border focus-within:border-theme-primary">
              <input
                onChange={e => search(e.target.value.toLowerCase())}
                className="box-border h-full w-full bg-theme-background p-6 focus:bg-theme-surface"
                type="text"
                placeholder="Search by product name or ID..."
              />
              <button className="h-full w-44 bg-theme-primary font-poppins-medium text-theme-surface">
                Search
              </button>
            </div>

            <select
              onChange={e => filter(e.target.value)}
              className="textField"
              aria-label="All Categories"
              ref={dropdownElem}
              defaultValue={"All"}>
              <option value="All">All Categories</option>
              <option value="Snacks">Snacks</option>
              <option value="Beverage">Beverage</option>
              <option value="Food">Food</option>
            </select>
          </div>

          <div className="pointer-events-auto mt-9 flex h-full w-full flex-wrap gap-8 overflow-y-auto overflow-x-hidden pb-8">
            {products.length > 0 ? (
              filteredProducts!.map((prod, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (prod.quantity > 0) addProduct(prod)
                  }}
                  className={`box-border h-48 w-80 rounded-xl bg-theme-surface p-5 ${
                    prod.quantity === 0
                      ? "border bg-theme-background"
                      : "cursor-pointer shadow-md"
                  }`}>
                  <h4
                    className={`w-full truncate font-poppins-medium text-sm ${
                      prod.quantity === 0 && "text-theme-on-background"
                    }`}>
                    {prod.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      prod.quantity === 0
                        ? "text-theme-on-background"
                        : "text-gray-400"
                    }`}>
                    ID: {prod.id}
                  </p>

                  <div className="mt-2 flex w-full flex-row items-end justify-between">
                    <h4
                      className={`font-poppins-medium text-theme-primary ${
                        prod.quantity === 0
                          ? "text-theme-on-background text-gray-400"
                          : "text-theme-primary"
                      }`}>
                      {prod.quantity === 0 ? "Out of Stock" : `P${prod.price}`}
                    </h4>
                    <div
                      className={`h-max w-24 overflow-hidden rounded-lg shadow-md ${
                        prod.quantity === 0 && "grayscale"
                      }`}>
                      <Image
                        src={prod.image}
                        placeholder={"empty"}
                        unoptimized
                        alt="Landscape picture"
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}

            {!productsFound && <p>No results...</p>}
          </div>
        </div>

        <div className="box-border flex h-full w-[700px] flex-col bg-theme-surface pl-11 pt-14 pr-11 pb-8">
          <div className="flex h-max items-center justify-between">
            <h3 className="font-poppins-bold text-[1.4rem]">Current Order</h3>
            <button
              onClick={() => clearCart()}
              className="rounded-xl border-[2px] border-theme-primary bg-theme-surface px-9 py-4 text-center font-poppins-medium text-sm text-theme-primary hover:bg-theme-primary hover:text-theme-surface">
              Clear All
            </button>
          </div>

          <div className="mt-4 flex h-full w-full flex-col gap-y-2 overflow-y-auto overflow-x-hidden">
            {/* ITEM */}

            {cart.length > 0 ? (
              cart.map(prod => (
                <div className="flex h-max w-full flex-row items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      src={prod.product.image}
                      placeholder={"empty"}
                      unoptimized
                      alt="Landscape picture"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
                  <p className="flex-1 font-poppins-medium text-sm line-clamp-2">
                    {prod.product.name}
                  </p>
                  <div className="flex h-max flex-row items-center">
                    {prod.quantity === 1 ? (
                      <DeleteIcon
                        onClick={() => removeProduct(prod.product.id!)}
                        spanClass="h-12 w-12 bg-theme-background grid place-items-center cursor-pointer rounded"
                        svgClass="stroke-theme-on-surface h-5 w-5"
                      />
                    ) : (
                      <MinusIcon
                        onClick={() => decrementQty(prod.product.id!)}
                        spanClass="h-12 w-12 bg-theme-background grid place-items-center cursor-pointer rounded"
                        svgClass="stroke-theme-on-surface h-5 w-5"
                      />
                    )}
                    <p className="px-3 font-poppins-medium text-sm">
                      {prod.quantity}
                    </p>
                    <PlusIcon
                      onClick={() => incrementQty(prod.product.id!)}
                      spanClass="h-12 w-12 bg-theme-background grid place-items-center cursor-pointer rounded"
                      svgClass="stroke-theme-on-surface h-5 w-5"
                    />
                  </div>
                  <p className="ml-auto mr-1 h-max w-16 break-all font-poppins-bold text-sm line-clamp-2">
                    P{prod.quantity * prod.product.price}
                  </p>
                </div>
              ))
            ) : (
              <p>No items in cart...</p>
            )}
          </div>

          <div className="flex h-52 w-full flex-col gap-2 pt-6">
            <div className="flex w-full flex-row justify-between">
              <p className="font-poppins-medium text-gray-400">Subtotal</p>
              <p className="font-poppins-medium text-gray-400">
                P{getCartTotal()}
              </p>
            </div>

            <div className="mb-2 flex w-full flex-row justify-between">
              <p className="font-poppins-medium text-gray-400">
                Sales Tax (12%)
              </p>
              <p className="font-poppins-medium text-gray-400">P119.00</p>
            </div>

            <div className="mb-2 flex w-full flex-row justify-between">
              <h3 className="font-poppins-medium">Total</h3>
              <h3 className="font-poppins-medium text-theme-primary">
                P{cart.length > 0 ? getCartTotal() + 119 : 0}
              </h3>
            </div>

            <button
              onClick={() =>
                submitReceipt({
                  products: cart,
                  total: getCartTotal(),
                  cashier: session?.user.username!,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                })
              }
              className="w-full rounded-full border-[2px] border-theme-primary bg-theme-primary py-2 text-theme-surface hover:bg-theme-surface hover:text-theme-primary">
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactElement) => <SideNav>{page}</SideNav>

export default Home
