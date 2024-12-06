import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from 'bcryptjs'
import { z } from "zod";

import prisma from "./lib/prisma";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    jwt( params ) {
      const { token, user } = params

      if( user ) {
        token.data = user
      }

      return token
    },

    session( params ) {
      const { session, token, user } = params
      session.user = token.data as any 
      return session
    }
  },


  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) throw new Error("Invalid credentials.");

        const { email, password } = parsedCredentials.data;

        // Search user in db
        const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}})

        if(!user) throw new Error("Invalid credentials.")

        // Compare password from client and db's password
        if( !bcryptjs.compareSync(password,user.password) ) throw new Error("Invalid credentials.")

        // return user without password
        const { password: _, ...rest } = user
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
