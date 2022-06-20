import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"

export default function SignIn() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="grid w-[300px] h-[500px] bg-slate-200">
        {error ?? <p>{error}</p>}
        <label>
          Username
          <input
            name="username"
            type="text"
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
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
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}
