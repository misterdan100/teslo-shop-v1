'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client"

interface PaginationOptions {
    page?: number
    take?: number
    gender?: Gender
}

export const getPaginatedProductsWithImages = async ({page = 1, take = 12, gender} : PaginationOptions) => {
    try {
        // Validate params
        if(isNaN(Number(page))) page = 1
        if(page < 1) page = 1
        if(isNaN(Number(take))) take = 12
        if(take < 1) take = 1

        const paginatedOptions = {
            take,
            skip: (page - 1) * take,
        }

        const filterOptions: {} = gender ? {
            where: {gender}
        } : {}


        const optionToSearchProductus = {
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            },
            ...paginatedOptions,
            ...filterOptions
        }

        const [ products, totalCount, categories] = await Promise.all([
            prisma.product.findMany(optionToSearchProductus),
            prisma.product.count(filterOptions),
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