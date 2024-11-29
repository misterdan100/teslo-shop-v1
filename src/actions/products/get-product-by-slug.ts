'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async ( slug: string ) => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                slug
            },
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            }
        })

        if(!product) return null

        const { ProductImage, ...restProduct} = product

        return {
            ...restProduct,
            images: ProductImage.map( image => image.url)
        }


        
    } catch (error) {
        console.log(error)
        throw new Error('Error in [GETPRODUCTBYSLUG]')
    }
}