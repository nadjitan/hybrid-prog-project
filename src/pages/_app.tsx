import { withTRPC } from "@trpc/next"
import superjson from "superjson"
import { AppType } from "next/dist/shared/lib/utils"
import { AppRouter } from "./api/trpc/[trpc]"
import { SessionProvider } from "next-auth/react"
import { useCreateStore, Provider } from "../../store/useStore"
import "../styles/globals.css"
import SideNav from "../components/layouts/SideNav"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const createStore = useCreateStore(pageProps.initialZustandState)
  const getLayout = Component.getLayout ?? (page => page)
  const layout = getLayout(<Component {...pageProps} />)

  return (
    <Provider createStore={createStore}>
      <SessionProvider session={session}>{layout}</SessionProvider>
    </Provider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc"

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)
