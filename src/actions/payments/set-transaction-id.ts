'use server'

import prisma from "@/lib/prisma"

export const setTransactionId = async (orderId: string, transactionId: string) => {
    try {

        const res = await prisma.order.update({
            where: {id: orderId},
            data: {
                transactionId: transactionId
            }
        })

        if(!res) {
            return {
                ok: false,
                message: 'Order not found'
            }
        }

        return {
            ok: true
        }

        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Order couldn't be updated"
        }
    }
}