'use server'

import { signIn } from "@/auth.config"

export const loginDemoUser = async () => {
    try {
        const user = await signIn("credentials", {
            email: 'correo1@correo.com',
            password: 'password',
            redirect: false
        })

        return "Success";
    } catch (error) {
        if ((error as any).type === "CredentialsSignIn") {
            return "CredentialsSignIn";
          }
      
          return "UnknownError";
    }
}