import Image from "next/image"
import { ReactElement, useEffect, useState } from "react"
import { useStore } from "../../store/useStore"
import { DeleteIcon } from "../components/icons"
import SideNav from "../components/layouts/SideNav"
import { TReceipt, TReceipts } from "../server/routers/receipt"
import { trpc } from "../utils/trpc"
import { NextPageWithLayout } from "./_app"

const SalesHistory: NextPageWithLayout = () => {
  const [showModal, setShowModal] = useState(false)
  const { receipts, fetchRecceipts } = useStore()
  const [selected, setSelected] = useState<TReceipt | undefined>()
  const [orderedList, setOrderedList] = useState<TReceipts>([])
  const receiptMutation = trpc.useMutation(["receipt.delete"])

  useEffect(() => {
    if (receiptMutation.isSuccess) fetchRecceipts()
  }, [receiptMutation.isSuccess])

  useEffect(
    () =>
      setOrderedList(
        [...receipts].sort((recA, recB) => {
          const dateA = new Date(recA.createdAt)
          const dateB = new Date(recB.createdAt)
          if (dateA > dateB) return -1
          if (dateA < dateB) return 1
          return 0
        })
      ),
    [receipts]
  )

  const utsToLocale = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleString()
  }

  const getTotal = () =>
    selected?.products.reduce(
      (currNum, prod) => currNum + prod.quantity * prod.product.price,
      0
    )

  const deleteReceipt = () => {
    receiptMutation.mutate({ id: selected!.id! })
    setOrderedList(receipts.filter(rec => rec.id !== selected!.id))
    setSelected(undefined)
    setShowModal(false)
  }

  const arrangeReceipts = (value: string) => {
    if (value === "Latest") {
      setOrderedList(
        [...receipts].sort((recA, recB) => {
          const dateA = new Date(recA.createdAt)
          const dateB = new Date(recB.createdAt)
          if (dateA > dateB) return -1
          if (dateA < dateB) return 1
          return 0
        })
      )
    }
    if (value === "Oldest") {
      setOrderedList(
        [...receipts].sort((recA, recB) => {
          const dateA = new Date(recA.createdAt)
          const dateB = new Date(recB.createdAt)
          if (dateA > dateB) return 1
          if (dateA < dateB) return -1
          return 0
        })
      )
    }
    if (value === "Highest Price") {
      setOrderedList(
        [...receipts].sort((recA, recB) => {
          if (recA.total > recB.total) return -1
          if (recA.total < recB.total) return 1
          return 0
        })
      )
    }
    if (value === "Lowest Price") {
      setOrderedList(
        [...receipts].sort((recA, recB) => {
          if (recA.total > recB.total) return 1
          if (recA.total < recB.total) return -1
          return 0
        })
      )
    }
  }

  return (
    <>
      <div
        className={`relative z-10 ${showModal ? "block" : "hidden"}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true">
        <div
          id="modal-bg"
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={() => setShowModal(false)}
        />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* MODAL */}
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h4 className="w-full text-center font-poppins-medium">
                  Are you sure you want to delete?
                </h4>

                <button
                  className="col-span-6 mt-4 block w-full rounded-full border-[2px] border-theme-primary bg-theme-surface p-2.5 font-poppins-medium text-sm text-theme-primary hover:bg-theme-primary hover:text-theme-surface"
                  onClick={() => deleteReceipt()}>
                  Delete
                </button>
                <button
                  className="col-span-6 mt-4 block w-full rounded-full border-[2px] border-theme-primary bg-theme-primary p-2.5 font-poppins-medium text-sm text-theme-surface"
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-h-screen min-h-screen w-full flex-row overflow-hidden bg-theme-background">
        <div className="box-border flex h-full w-full flex-col pt-[2.8rem] pl-11 pr-11">
          <div className="flex h-max w-full flex-row items-center justify-between">
            <h3 className="h-max font-poppins-bold text-[1.4rem]">
              Sales History
            </h3>

            <select
              onChange={e => arrangeReceipts(e.target.value)}
              className="textField py-5"
              aria-label="Latest"
              defaultValue={"Latest"}>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Highest Price">Highest Price</option>
              <option value="Lowest Price">Lowest Price</option>
            </select>
          </div>

          <div className="mt-10 max-h-full w-full">
            <table className="h-full w-full table-auto overflow-hidden text-left">
              <thead className="flex w-full">
                <tr className="mb-4 flex w-full">
                  <th className="w-[250px] text-center">ID</th>
                  <th className="flex-1">Date & Time</th>
                  <th className="w-44">Total Price</th>
                  <th className="w-44 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="flex h-[70vh] w-full flex-col items-center justify-between overflow-y-auto overflow-x-hidden">
                {receipts !== undefined && receipts.length > 0 ? (
                  orderedList!.map((rec, index) => (
                    <tr
                      key={index}
                      onClick={() => setSelected(rec)}
                      className={`flex w-full cursor-pointer items-center py-4 ${
                        selected !== undefined && selected.id === rec.id
                          ? "bg-theme-primary text-theme-surface hover:bg-theme-primary hover:text-theme-surface"
                          : "hover:bg-theme-surface hover:text-theme-on-surface"
                      }`}>
                      <td className="w-[250px] text-center">{rec.id}</td>
                      <td className="flex-1">{utsToLocale(rec.createdAt)}</td>
                      <td className="w-44">P{rec.total}</td>
                      <td className="w-44">
                        <div className="flex flex-row justify-center gap-x-4">
                          <DeleteIcon
                            onClick={() => {
                              setSelected(rec)
                              setShowModal(true)
                            }}
                            svgClass={`stoke-theme-on-surface w-8 h-8 ${
                              selected !== undefined &&
                              selected.id === rec.id &&
                              "stroke-theme-surface"
                            }`}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="mt-4">
                    <td>Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="box-border flex h-full w-[700px] flex-col bg-theme-surface pl-11 pt-14 pr-11 pb-8">
          {!selected ? (
            <h4 className="grid h-full w-full place-items-center font-poppins-medium text-theme-on-background">
              Choose a sales entry to view...
            </h4>
          ) : (
            <>
              <div className="flex h-max items-center justify-between">
                <h4 className="font-poppins-bold ">
                  <span className="text-sm font-medium">Order ID:</span>{" "}
                  {selected?.id}
                  <i></i>
                </h4>
                <button
                  onClick={() => setSelected(undefined)}
                  className="rounded-xl border-[2px] border-theme-primary bg-theme-surface px-9 py-4 text-center font-poppins-medium text-sm text-theme-primary hover:bg-theme-primary hover:text-theme-surface">
                  Close
                </button>
              </div>

              <div className="mt-4 flex h-full w-full flex-col gap-y-2 overflow-y-auto overflow-x-hidden">
                {selected !== undefined && selected.products.length > 0
                  ? selected.products.map((prod, index) => (
                      <div
                        key={index}
                        className="flex h-max w-full flex-row items-center gap-4">
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
                        <div className="h-max w-8">{prod.quantity}</div>
                        <p className="ml-auto mr-1 h-max w-16 break-all font-poppins-bold text-sm line-clamp-2">
                          P{prod.product.price}
                        </p>
                      </div>
                    ))
                  : "Nothing selected"}
              </div>

              <div className="flex h-52 w-full flex-col gap-2 pt-6">
                <div className="flex w-full flex-row justify-between">
                  <p className="font-poppins-medium text-gray-400">Subtotal</p>
                  <p className="font-poppins-medium text-gray-400">
                    P
                    {selected !== undefined && selected.products.length > 0
                      ? getTotal()! - 119
                      : 0}
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
                    P
                    {selected !== undefined && selected.products.length > 0
                      ? getTotal()!
                      : 0}
                  </h3>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

SalesHistory.getLayout = (page: ReactElement) => <SideNav>{page}</SideNav>

export default SalesHistory
