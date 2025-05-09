"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config( process.env.CLOUDINARY_URL ?? '')

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  // next: take the string price, transform it to number with 2 decimals
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  // flat the FormData object to a simple object
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
    };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
  const { id, ...rest } = product;

  try {
    // tx to save images and product
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // update
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

      } else {
        // create product
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // Process to load images
      // iterate images and save them
      if( formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[])

        if(!images) {
            throw new Error("Images couldn't be loaded, rolling back")
        }

        await prisma.productImage.createMany({
            data: images.map( image => ({
                url: image!,
                productId: product.id
            }))
        })
      }

      return {
          product,
        };
    });
    
    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/products/${product.slug}`)


    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Product couldn't be updated",
    };
  }
};


const uploadImages = async ( images: File[]) => {
    try {
        // create promises array
        const uploadPromises = images.map( async (image) => {

            try {
                // convert the image in a string to load to cloudinary
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64')
                
                // load image to cloudinary and return a image url
                return cloudinary.uploader.upload(`data:image/png;base64,${ base64Image }`)
                .then( r => r.secure_url )
                
            } catch (error) {
                console.log(error)
                return null
            }
        })

        // return an images url array of strings
        const uploadedImages = await Promise.all(uploadPromises)

        return uploadedImages

    } catch (error) {
        console.log(error)
        return null
    }
}