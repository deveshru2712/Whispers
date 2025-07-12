import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    const protectedRoute = ["/home", "/profile"];
    const authRoute = ["/sign-in"];
    const { pathname } = request.nextUrl;

    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/favicon.ico")
    ) {
      return NextResponse.next();
    }

    if (authRoute.includes(pathname) && token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (protectedRoute.some((route) => pathname.startsWith(route))) {
      if (!token) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
