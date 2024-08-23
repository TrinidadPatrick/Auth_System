import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

const protectedRoutes = ["/home", "/settings", "/"]
const authRoutes = ["/login", "/signup"]

export default async function middleware(request: NextRequest) {
    const session = await auth()

    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname)

    // If the user is not authenticated, redirect them to the login page
    if(!session && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.nextUrl.origin))
    }

    // If the user is authenticated and the url is authpage, redirect them to the home page
    if(session && isAuthRoute) {
        return NextResponse.redirect(new URL("/home", request.nextUrl.origin))
    }

    return NextResponse.next()
}


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }