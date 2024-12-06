"use server";

import { signIn } from "@/auth.config";
import { sleep } from "@/utils/sleep";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(2)

    const user = await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if ((error as any).type === "CredentialsSignIn") {
      return "CredentialsSignIn";
    }

    return "UnknownError";
  }
}

export async function login(email: string, password: string) {
  try {
    // await sleep(2)

    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if ((error as any).type === "CredentialsSignIn") {
      return "CredentialsSignIn";
    }

    return "UnknownError";
  }
}
