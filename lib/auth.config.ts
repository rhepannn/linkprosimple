import type { NextAuthConfig } from "next-auth";

export const authConfig = {

  providers: [], // Empty for Edge compatibility
  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes("/kasir")) {
        return `${baseUrl}/admin`;
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role;
      const path = nextUrl.pathname;

      if (path.startsWith("/kasir")) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      const isOnAdmin = path.startsWith("/admin");
      const isOnSnapper = path.startsWith("/snapper");
      const isOnProtected = isOnAdmin || isOnSnapper;

      if (isOnProtected) {
        if (!isLoggedIn) return false; // Redirects to /login

        // Role-based authorization
        if (isOnAdmin && userRole !== "ADMIN") {
          return Response.redirect(new URL(userRole === "SNAPPER" ? "/snapper" : "/", nextUrl));
        }
        if (isOnSnapper && userRole !== "SNAPPER" && userRole !== "ADMIN") {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
