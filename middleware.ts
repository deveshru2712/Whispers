import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  try {
    const sessionCookieName =
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

    const sessionToken = request.cookies.get(sessionCookieName)?.value;

    console.log("Session token from cookie:", sessionToken);

    const protectedRoutes = [
      "/posts/create",
      "/posts/update",
      "/dashboard",
      "/profile",
      "/settings",
    ];
    const authRoute = "/sign-in";
    const publicRoutes = ["/", "/blog", "/about", "/contact"];
    const { pathname } = request.nextUrl;

    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/favicon.ico") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (pathname.startsWith(authRoute)) {
      if (sessionToken) {
        console.log("User already logged in, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
    }

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtectedRoute) {
      if (!sessionToken) {
        console.log("No token for protected route, redirecting to sign-in");
        return NextResponse.redirect(new URL(authRoute, request.url));
      }
      return NextResponse.next();
    }

    if (!sessionToken) {
      console.log("No token for other route, redirecting to sign-in");
      return NextResponse.redirect(new URL(authRoute, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
