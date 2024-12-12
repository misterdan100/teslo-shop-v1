'use server'

import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {
    try {
        const order = await prisma.order.findUnique({
            where: {id},
            include: {
                OrderAddress: true,
                OrderItem: {
                    include: { product: {
                        include: {ProductImage: true}
                    }
                     }
                },
            }
        })

        if( !order ) return null

        return order
    } catch (error) {
        console.log(error)
        return null
    }
}