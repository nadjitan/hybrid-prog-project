import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { useStore } from "../../../store/useStore"
import { trpc } from "../../utils/trpc"
import { CatalogueIcon, ReceiptFilledIcon, StoreIcon } from "../icons"

const SideNav: NextPage<{ children: ReactElement }> = ({ children }) => {
  trpc.useQuery(["product.fetchAll"])
  trpc.useQuery(["receipt.fetchAll"])
  const products = trpc.useQuery(["product.list"])
  const receipts = trpc.useQuery(["receipt.list"])
  const { state, setProducts, setReceipts } = useStore()

  useEffect(() => {
    if (products.data?.length! > 0 && products.data !== undefined) {
      setProducts(products.data)
    }
  }, [products.data])
  useEffect(() => {
    if (receipts.data?.length! > 0 && receipts.data !== undefined) {
      setReceipts(receipts.data)
    }
  }, [receipts.data])

  const router = useRouter()
  const [active, setActive] = useState<string>(
    router.pathname === "/" ? "store" : router.pathname.replace("/", "")
  )

  return (
    <main className="flex flex-row">
      <nav className="flex min-w-[80px] flex-col items-center bg-theme-surface wide:min-w-[112px]">
        <div className="grid h-36 w-full place-items-center">
          <h3 className="font-prohibition text-[1.4rem] font-bold text-theme-primary wide:text-[1.8rem]">
            POS
          </h3>
        </div>

        <Link href={"/"}>
          <a
            className={`grid h-20 w-full cursor-pointer place-items-center hover:bg-theme-primary wide:h-24 [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-theme-surface ${
              active === "store" ? "bg-theme-primary" : ""
            }`}
            onClick={() => setActive("store")}>
            <StoreIcon
              svgClass={`${
                active === "store"
                  ? "fill-theme-surface"
                  : "fill-theme-on-background"
              }`}
            />
          </a>
        </Link>
        <Link href={"/catalogue"}>
          <a
            className={`grid h-20 w-full cursor-pointer place-items-center hover:bg-theme-primary wide:h-24 [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-theme-surface ${
              active === "catalogue" ? "bg-theme-primary" : ""
            }`}
            onClick={() => setActive("catalogue")}>
            <CatalogueIcon
              svgClass={`${
                active === "catalogue"
                  ? "fill-theme-surface"
                  : "fill-theme-on-background"
              }`}
            />
          </a>
        </Link>
        <Link href={"/sales-history"}>
          <a
            className={`grid h-20 w-full cursor-pointer place-items-center hover:bg-theme-primary wide:h-24 [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-theme-surface ${
              active === "sales-history" ? "bg-theme-primary" : ""
            }`}
            onClick={() => setActive("sales-history")}>
            <ReceiptFilledIcon
              svgClass={`w-9 h-9 ${
                active === "sales-history"
                  ? "fill-theme-surface"
                  : "fill-theme-on-background"
              }`}
            />
          </a>
        </Link>
      </nav>
      {children}
    </main>
  )
}

export default SideNav
