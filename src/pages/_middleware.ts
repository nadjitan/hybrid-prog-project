import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req: any) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET })
  const pathname = req.nextUrl.pathname
  const protectedRoutes = ["/", "/catalogue", "/sales-history"]

  if (protectedRoutes.find(pn => pn === pathname)) {
    if (!session)
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/signin`
          : "http://localhost:3000/auth/signin"
      )
  }
  if (pathname === "/auth/signin") {
    if (session)
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`
          : "http://localhost:3000/"
      )
  }
  return NextResponse.next()
}
