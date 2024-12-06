import NextAuth, { DefaultSession } from "next-auth";

// this extends the default properties of next-auth session to add properties
declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            name: string
            email: string
            emailVerified?: boolean
            role: string
            image?: string
        } & DefaultSession['user']
    }
}