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

    // Validate credentials and set the session cookie WITHOUT redirecting.
    // We let the client handle navigation so the NEXT_REDIRECT error never
    // leaks into the client try/catch (which would show a false "system error").
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, redirectTo };
  } catch (error: any) {
    if (error instanceof AuthError) {
      return { success: false, error: "Email atau kata sandi salah." };
    }

    console.error("Login Server Action Error:", error);
    return { success: false, error: "Terjadi kesalahan sistem saat masuk." };
  }
}
