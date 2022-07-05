import { NextPage } from "next"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { useStore } from "../../../store/useStore"
import { CatalogueIcon, ReceiptFilledIcon, StoreIcon } from "../icons"

const SideNav: NextPage<{ children: ReactElement }> = ({ children }) => {
  const { data: session, status } = useSession()
  const { fetchProducts, fetchRecceipts } = useStore()
  useEffect(() => {
    fetchProducts()
    fetchRecceipts()
  }, [])

  const router = useRouter()
  const [active, setActive] = useState<string>(
    router.pathname === "/" ? "store" : router.pathname.replace("/", "")
  )

  return (
    <main className="flex flex-row">
      <nav className="flex min-w-[80px] flex-col bg-theme-surface wide:min-w-[112px]">
        <div className="grid h-32 w-full place-items-center">
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

        <div className="mt-auto mb-6 grid w-full place-items-center ">
          <span className="mb-2 text-[0.8rem] text-theme-on-background wide:text-sm">
            {session?.user.username}
          </span>
          <button
            onClick={() => signOut()}
            className="rounded-full border border-theme-primary bg-theme-surface px-3 py-[0.1rem] text-[0.8rem] text-sm text-theme-primary hover:bg-theme-primary hover:text-theme-surface wide:px-5 wide:text-center">
            Logout
          </button>
        </div>
      </nav>
      {children}
    </main>
  )
}

export default SideNav
