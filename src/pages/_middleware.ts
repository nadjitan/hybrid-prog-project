import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: any) {
  if (req.nextUrl.pathname === "/") {
    const session = await getToken({ req, secret: process.env.JWT_SECRET })
    if (!session)
      return NextResponse.redirect(
        `${
          process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/signin`
            : "http://localhost:3000"
        }/auth/signin`
      )
  }
  if (req.nextUrl.pathname === "/auth/signin") {
    const session = await getToken({ req, secret: process.env.JWT_SECRET })
    if (session)
      return NextResponse.redirect(
        `${
          process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`
            : "http://localhost:3000"
        }/`
      )
  }
  return NextResponse.next()
}
