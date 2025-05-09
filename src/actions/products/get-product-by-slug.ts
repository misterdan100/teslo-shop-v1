'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async ( slug: string ) => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                slug
            },
            include: {
                ProductImage: true
            }
        })

        if(!product) return null

        const { ProductImage } = product

        return {
            ...product,
            images: ProductImage.map( image => image.url)
        }


        
    } catch (error) {
        console.log(error)
        throw new Error('Error in [GETPRODUCTBYSLUG]')
    }
}