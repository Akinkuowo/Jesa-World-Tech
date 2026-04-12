import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/admin/login",
  "/admin/register",
  "/new-verification",
  "/reset",
  "/new-password",
  "/services",
  "/about",
  "/portfolio",
  "/careers",
  "/contact",
  "/api/contact",
  "/api/uploadthing",
];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === "/") return path === "/";
    return path.startsWith(route);
  });

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to /login if the user is not authenticated
  if (!isPublicRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated and trying to access auth pages
  if (
    isPublicRoute &&
    session?.userId &&
    (path.startsWith("/login") || path.startsWith("/register") || path.startsWith("/admin/login") || path.startsWith("/admin/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
