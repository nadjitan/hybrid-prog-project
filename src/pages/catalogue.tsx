import Image from "next/image"
import { ReactElement, useEffect, useRef, useState } from "react"
import { useStore } from "../../store/useStore"
import {
  DeleteIcon,
  EditIcon,
  LoadingIcon,
  PlusIcon,
} from "../components/icons"
import SideNav from "../components/layouts/SideNav"
import { TProduct } from "../server/routers/product"
import { trpc } from "../utils/trpc"
import { NextPageWithLayout } from "./_app"

const Catalogue: NextPageWithLayout = () => {
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [newProduct, setNewProduct] = useState<TProduct>()
  const [selectedProduct, setSelectedProduct] = useState<TProduct>()

  const { products, fetchProducts, fetchState } = useStore()

  const productCreate = trpc.useMutation(["product.create"])
  const productDelete = trpc.useMutation(["product.delete"])
  const productEdit = trpc.useMutation(["product.edit"])

  useEffect(() => {
    if (
      productCreate.isSuccess ||
      productEdit.isSuccess ||
      productDelete.isSuccess
    )
      fetchProducts()
  }, [productCreate.isSuccess, productEdit.isSuccess, productDelete.isSuccess])

  const addProduct = () => {
    if (
      newProduct !== undefined &&
      newProduct.name !== undefined &&
      newProduct.category !== undefined &&
      newProduct.price !== undefined &&
      newProduct.quantity !== undefined &&
      newProduct.image !== undefined
    ) {
      const builtProduct = {
        ...newProduct,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      productCreate.mutate({
        product: builtProduct,
      })
      setShowModal(false)
    }
  }

  const editProduct = () => {
    if (
      newProduct !== undefined &&
      newProduct.name !== undefined &&
      newProduct.category !== undefined &&
      newProduct.price !== undefined &&
      newProduct.quantity !== undefined &&
      newProduct.image !== undefined
    ) {
      productEdit.mutate({
        id: newProduct!.id!,
        product: newProduct,
      })

      setShowModal(false)
      setEditModal(false)
      setNewProduct({} as TProduct)
    }
  }

  const deleteProduct = () => {
    productDelete.mutate({ id: selectedProduct?.id! })
    setSelectedProduct(undefined)
    setShowModal(false)
    setDeleteModal(false)
  }

  function showLoading() {
    if (
      productCreate.isLoading ||
      productDelete.isLoading ||
      productEdit.isLoading
    ) {
      return (
        <div className="absolute right-12 bottom-12 flex h-16 w-44 cursor-progress flex-row items-center justify-center rounded-xl bg-theme-surface shadow-lg">
          <p className="mb-1 mr-2 font-poppins-medium text-sm text-theme-primary">
            Sending
          </p>
          <LoadingIcon svgClass="h-full w-full stroke-theme-primary cursor-progress" />
        </div>
      )
    }
    if (fetchState === "fetching") {
      return (
        <div className="absolute right-12 bottom-12 flex h-16 w-44 cursor-progress flex-row items-center justify-center rounded-xl bg-theme-surface shadow-lg">
          <p className="mb-1 mr-2 font-poppins-medium text-sm text-theme-primary">
            Fetching
          </p>
          <LoadingIcon svgClass="h-full w-full stroke-theme-primary cursor-progress" />
        </div>
      )
    }
  }

  return (
    <>
      {showLoading()}
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
                {deleteModal ? (
                  <>
                    <h4 className="w-full text-center font-poppins-medium">
                      Are you sure you want to delete?
                    </h4>

                    <button
                      className="col-span-6 mt-4 block w-full rounded-full border-[2px] border-theme-primary bg-theme-surface p-2.5 font-poppins-medium text-sm text-theme-primary hover:bg-theme-primary hover:text-theme-surface"
                      onClick={() => deleteProduct()}>
                      Delete
                    </button>
                    <button
                      className="col-span-6 mt-4 block w-full rounded-full border-[2px] border-theme-primary bg-theme-primary p-2.5 font-poppins-medium text-sm text-theme-surface"
                      onClick={() => {
                        setNewProduct(undefined)
                        setDeleteModal(false)
                        setShowModal(false)
                      }}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="font-poppins-medium">
                      {editModal ? "Edit Product" : "Add Product"}
                    </h4>

                    <form className="mt-6 grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label
                          className="mb-1 block text-sm"
                          htmlFor="product_name">
                          Product Name
                        </label>

                        <input
                          defaultValue={editModal ? newProduct!.name : ""}
                          onChange={e =>
                            setNewProduct({
                              ...newProduct!,
                              name: e.target.value,
                            })
                          }
                          className="box-border w-full rounded-full border p-2.5 pl-6 text-sm"
                          type="text"
                          id="product_name"
                          placeholder="Enter product name"
                        />
                      </div>

                      <div className="col-span-6 h-max">
                        <label
                          className="mb-1 block text-sm"
                          htmlFor="category">
                          Category
                        </label>

                        <select
                          onChange={e =>
                            setNewProduct({
                              ...newProduct!,
                              category: e.target.value,
                            })
                          }
                          className="select2"
                          defaultValue={"DEFAULT"}>
                          <option
                            value="DEFAULT"
                            className="text-theme-on-background">
                            Pick a category...
                          </option>
                          <option value="Snacks">Snacks</option>
                          <option value="Beverage">Beverage</option>
                          <option value="Food">Food</option>
                        </select>
                      </div>

                      <div className="col-span-3">
                        <label className="mb-1 block text-sm" htmlFor="price">
                          Price
                        </label>

                        <input
                          defaultValue={editModal ? newProduct!.price : ""}
                          onChange={e =>
                            setNewProduct({
                              ...newProduct!,
                              price: parseInt(e.target.value),
                            })
                          }
                          type="number"
                          min="1"
                          onKeyDown={e => {
                            const val = (e.target as HTMLInputElement).value

                            if (!/[0-9]/.test(e.key)) e.preventDefault()

                            if (val.toString().length === 6) e.preventDefault()
                          }}
                          className="box-border w-full rounded-full border p-2.5 pl-6 text-sm focus:border-theme-primary"
                          id="price"
                          placeholder="Enter price"
                        />
                      </div>

                      <div className="col-span-3">
                        <label
                          className="mb-1 block text-sm"
                          htmlFor="quantity">
                          Quantity
                        </label>

                        <input
                          defaultValue={editModal ? newProduct!.quantity : ""}
                          onChange={e =>
                            setNewProduct({
                              ...newProduct!,
                              quantity: parseInt(e.target.value),
                            })
                          }
                          type="number"
                          min="1"
                          onKeyDown={e => {
                            const val = (e.target as HTMLInputElement).value

                            if (!/[0-9]/.test(e.key)) e.preventDefault()

                            if (val.toString().length === 6) e.preventDefault()
                          }}
                          className="box-border w-full rounded-full border p-2.5 pl-6 text-sm focus:border-theme-primary"
                          id="quantity"
                          placeholder="Enter quantity"
                        />
                      </div>

                      {/* IMAGE FILE (BASE64) */}
                      <div className="col-span-6">
                        <label className="mb-1 block text-sm" htmlFor="image">
                          Image
                        </label>

                        <input
                          onChange={e => {
                            let files = e.target.files
                            let reader = new FileReader()
                            reader.readAsDataURL(files![0]!)
                            reader.onload = e => {
                              setNewProduct({
                                ...newProduct!,
                                image: e.target!.result as string,
                              })
                            }
                          }}
                          placeholder="Hello"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          className="w-full cursor-pointer rounded-full border p-2.5 pl-6 text-sm file:cursor-pointer file:rounded-full file:border-none file:bg-teal-50 file:py-2 file:px-4 file:font-poppins-medium file:text-theme-primary file:after:cursor-pointer"
                        />
                      </div>

                      <button
                        className="col-span-6 block w-full rounded-full bg-theme-primary p-2.5 font-poppins-medium text-sm text-white"
                        type="submit"
                        onClick={e => {
                          e.preventDefault()

                          if (editModal) editProduct()
                          else addProduct()
                        }}>
                        {editModal ? "Edit Product" : "Add Product"}
                      </button>

                      <button
                        className="col-span-6 block w-full rounded-full border-[2px] border-theme-primary bg-theme-surface p-2.5 font-poppins-medium text-sm text-theme-primary hover:bg-theme-primary hover:text-theme-surface"
                        type="reset"
                        onClick={e => {
                          e.preventDefault()
                          setEditModal(false)
                          setShowModal(false)
                        }}>
                        Cancel
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="box-border flex h-full max-h-screen min-h-screen w-full flex-col bg-theme-background pt-[2.8rem] pl-11 pr-11 pb-11">
        <h3 className="h-max font-poppins-bold text-[1.4rem]">Catalogue</h3>

        <div className="mt-[2.8rem] box-border grid max-h-full w-full overflow-y-auto overflow-x-hidden rounded-xl bg-theme-surface pt-[2.8rem] pl-11 pr-11 pb-11">
          <div className="flex h-14 w-full flex-row justify-between">
            <h3 className="h-max font-poppins-bold text-[1.4rem]">Products</h3>
            <button
              className="grid w-44 place-items-center rounded-full border-[2px] border-theme-primary bg-theme-primary p-2.5 hover:bg-theme-surface [&>*:nth-child(1)]:hover:text-theme-primary [&>*:nth-child(1)>*:nth-child(1)>*:nth-child(1)]:hover:stroke-theme-primary"
              type="submit"
              onClick={e => {
                e.preventDefault()
                setShowModal(true)
              }}>
              <span className="font-poppins-medium text-theme-surface">
                <PlusIcon svgClass="stroke-theme-surface h-6 w-6 mr-2" /> Add
                Item
              </span>
            </button>
          </div>

          <table className="mt-6 h-full w-full overflow-hidden text-left">
            <thead className="flex w-full">
              <tr className="mb-4 flex w-full">
                <th className="w-[250px]">ID</th>
                <th className="w-[120px]">Image</th>
                <th className="flex-1">Product Name</th>
                <th className="w-44">Category</th>
                <th className="w-44">Quantity</th>
                <th className="w-44">Price</th>
                <th className="w-44 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="flex h-[50vh] w-full flex-col items-center justify-between overflow-y-auto overflow-x-hidden">
              {products.length > 0 ? (
                products.map((prod, index) => (
                  <tr className="mb-4 flex w-full items-center" key={index}>
                    <td className="w-[250px]">{prod.id}</td>
                    <td className="w-[120px]">
                      <div className="h-16 w-16 overflow-hidden rounded-lg">
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
                    </td>
                    <td className="flex-1">
                      <span className="w-full line-clamp-2">{prod.name}</span>
                    </td>
                    <td className="w-44">{prod.category}</td>
                    <td className="w-44">{prod.quantity}</td>
                    <td className="w-44">P{prod.price}</td>
                    <td className="w-44">
                      <div className="flex flex-row justify-center gap-x-4">
                        <EditIcon
                          onClick={() => {
                            setNewProduct(prod)
                            setShowModal(true)
                            setEditModal(true)
                          }}
                          svgClass="stoke-theme-on-surface w-8 h-8"
                        />
                        <DeleteIcon
                          svgClass="stoke-theme-on-surface w-8 h-8"
                          onClick={() => {
                            setSelectedProduct(prod)
                            setShowModal(true)
                            setDeleteModal(true)
                          }}
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
    </>
  )
}

Catalogue.getLayout = (page: ReactElement) => <SideNav>{page}</SideNav>

export default Catalogue
