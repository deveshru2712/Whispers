import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    const adminRoutes = ["/posts/create", "/posts/update"];
    const authRoute = "/sign-in";
    const publicRoutes = ["/", "/blog"];
    const { pathname } = request.nextUrl;

    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/favicon.ico")
    ) {
      return NextResponse.next();
    }

    if (pathname.startsWith(authRoute)) {
      if (token) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }

    const isAdminRoute = adminRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAdminRoute) {
      if (!token) {
        return NextResponse.redirect(new URL(authRoute, request.url));
      }
      if (!token.isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
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
