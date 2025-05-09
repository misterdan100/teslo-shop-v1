'use server'

import { z } from "zod";
import { v2 as cloudinary } from 'cloudinary';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
    try {

        if( !imageUrl.startsWith('http')) {
            return {
                ok: false,
                message: "File system images couldn't be deleted"
            }
        }

        const imageName = imageUrl.split('/')
            .pop()?.split('.')[0] ?? ''


        await cloudinary.uploader.destroy( imageName )

        const deletedImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {slug: true}
                }
            }
        })

        // revalidate path
        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/product/${deletedImage.product.slug}`)
        revalidatePath(`/product/${deletedImage.product.slug}`)

        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Image couldn't be deleted"
        }
    }
}