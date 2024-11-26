'use server'

import prisma from "@/lib/prisma"

interface PaginationOptions {
    page?: number
    take?: number
}

export const getPaginatedProductsWithImages = async ({page = 1, take = 12} : PaginationOptions) => {
    try {

        // Validate params
        if(isNaN(Number(page))) page = 1
        if(page < 1) page = 1
        if(isNaN(Number(take))) take = 12
        if(take < 1) take = 1

        const optionToSearchProductus = {
            take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            },
        }

        const [ products, totalCount, categories] = await Promise.all([
            prisma.product.findMany(optionToSearchProductus),
            prisma.product.count(),
            prisma.category.findMany()
        ])


        // Get total products and pages
        const totalPages = Math.ceil(totalCount / take)

        // Get categories
        const objectCategories = categories.reduce((object, cat) => ({
            ...object,
            [cat.id]: cat.name.toLowerCase()
        }), {} as Record<string, string>)

        // Mod and return results
        return {
            currentPage: page,
            totalPages,
            products: products.map( product => {

                const { categoryId, ProductImage, ...rest } = product

                return {
                    ...rest,
                    type: objectCategories[product.categoryId],
                    images: product.ProductImage.map( image => (image.url))
                }
            })
        }

    } catch (error) {
        throw new Error("Products couldn't be charged")
    }


}