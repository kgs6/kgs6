'use server';

import { signIn } from "@/app/auth";

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}