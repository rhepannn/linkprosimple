"use server";

import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";

export async function loginUser(data: any) {
  try {
    const { email, password } = data;

    if (!email || !password) {
      return { success: false, error: "Email dan kata sandi wajib diisi." };
    }

    // Check user role first so we know where to redirect
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "Email tidak terdaftar." };
    }

    let redirectTo = "/admin";
    if (user.role === "ADMIN") {
      redirectTo = "/admin";
    } else if (user.role === "SNAPPER") {
      redirectTo = "/snapper";
    }

    // Call NextAuth signIn on the server side
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });

    return { success: true };
  } catch (error: any) {
    if (error instanceof AuthError) {
      return { success: false, error: "Email atau kata sandi salah." };
    }

    // IMPORTANT: Next.js redirects use errors internally.
    // We must rethrow redirect errors so that Next.js handles the redirect properly!
    if (
      error.message === "NEXT_REDIRECT" || 
      (error.digest && error.digest.startsWith("NEXT_REDIRECT"))
    ) {
      throw error;
    }

    console.error("Login Server Action Error:", error);
    return { success: false, error: "Terjadi kesalahan sistem saat masuk." };
  }
}
