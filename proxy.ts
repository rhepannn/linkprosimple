// NOTE: File ini sebelumnya bernama middleware.ts.
// Dinonaktifkan dengan mengubah nama menjadi proxy.ts agar tidak terjadi redirect otomatis ke localhost:3000 saat mengakses /kasir.
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";


const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtected = req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname.startsWith("/kasir");
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/kasir", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

//wleeeejebbsjhfbsj