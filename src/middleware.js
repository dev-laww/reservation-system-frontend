import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

const adminPaths = [
    "/properties",
    "/tenants",
    "/booking",
    "/payments",
];

export async function middleware(request) {
    const { pathname } = request.nextUrl

    const session = await getToken({ req: request });

    if (!session && !pathname.startsWith("/auth")) return NextResponse.redirect(new URL("/auth", request.nextUrl))

    if (!session.admin && adminPaths.some(path => pathname === path)) return NextResponse.rewrite(new URL("/not-found", request.nextUrl))

    return NextResponse.next()
}

export const config = {
    matcher: "/((?!_next/static|_next/image|favicon.ico|api/*|auth/*).*)",
}