import type { NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { CartSlice } from "../../store/createCartSlice"
import { useStore } from "../../store/useStore"
import { trpc } from "../utils/trpc"

const Home: NextPage = () => {
  trpc.useQuery(["product.fetchAll"])
  const products = trpc.useQuery(["product.list"])
  const { data: session, status } = useSession()
  const { state, cart } = useStore()
  // const exampleData = trpc.useQuery(["example"]);
  // const { invalidateQueries } = trpc.useContext()
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
      <div className="mx-auto flex min-h-screen w-3/4 flex-col items-center justify-center break-all">
        <h1 className="text-center text-7xl font-extrabold">
          Create <span className="text-blue-500">React</span> App
        </h1>

        <div className="w-full">
          <div className="py-6 text-xl">
            {products.data !== undefined && products.data.length > 0 ? (
              <>
                <div
                  style={{
                    width: "500px",
                    height: "500px",
                  }}>
                  <Image
                    src={products.data[0]!.image}
                    unoptimized
                    alt="Landscape picture"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="py-6 text-2xl">
            <button onClick={() => signOut()}>Logout</button>

            {/* {exampleData.data ? (
              <div>
                {exampleData.data.length === 0 ? (
                  <p className="text-2xl">No data available, create new!</p>
                ) : (
                  exampleData.data.map(({ id }) => <p key={id}>{id}</p>)
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )} */}
          </div>
          {/* <button
            onClick={() => createExample.mutate()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Example
          </button> */}
        </div>
      </div>
    </>
  )
}

export default Home
