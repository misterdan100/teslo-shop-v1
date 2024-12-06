'use server'

import prisma from "@/lib/prisma"
import bcryptjs from 'bcryptjs'

interface Props {
    name: string
    email: string
    password: string
}

export const registerUser = async ( { name, email, password }: Props ) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password)
            },
            select: {
                id: true,
                name: true,
                email: true
            }

        })

        return {
            ok: true,
            user: user,
            message: 'User created'
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "New user couldn't be created"
        }
    }


}