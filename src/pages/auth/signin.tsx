import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"

export default function SignIn() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  return (
    <div className="grid h-full w-full place-items-center">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pt-8 pb-4 sm:p-6 sm:pb-6">
          <h1 className="w-full text-center text-theme-primary">LOGIN</h1>
          {error ?? <p>{error}</p>}

          <form className="mt-6 grid grid-cols-6 gap-4">
            <div className="col-span-6">
              <label className="mb-1 block text-sm" htmlFor="username">
                Username
              </label>

              <input
                onChange={e => setUsername(e.target.value)}
                className="box-border w-full rounded-full border  p-2.5 pl-6 text-sm"
                type="text"
                id="username"
              />
            </div>

            <div className="col-span-6 h-max">
              <label className="mb-1 block text-sm" htmlFor="password">
                Password
              </label>

              <input
                onChange={e => setPassword(e.target.value)}
                className="box-border w-full rounded-full border p-2.5 pl-6 text-sm"
                type="password"
                id="password"
              />
            </div>

            <button
              className="col-span-6 block w-full rounded-full bg-theme-primary p-2.5 font-poppins-medium text-sm text-white"
              type="submit"
              onClick={e => {
                e.preventDefault()
                if (username && password)
                  signIn("credentials", {
                    username: username,
                    password: password,
                    redirect: false,
                  }).then(({ ok, error }: any) => {
                    if (ok) {
                      router.push("/")
                    } else {
                      setError("Wrong credentials")
                    }
                  })
              }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
