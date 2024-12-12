'use server'

import { auth } from "@/auth.config"
import type { Address, Size } from "@/interfaces"
import prisma from "@/lib/prisma"

interface ProductToOrder {
    productId: string
    quantity: number
    size: Size
}

export const placeOrder = async ( productIds: ProductToOrder[], address: Address ) => {

    // get user session from auth.config hook
    const session = await auth()
    if( !session?.user.id ) {
        return {
            ok: false,
            message: 'There is not a user session'
        }
    }

    // Get Product's information
    //* Note: can be selected two products with the same ID
    const products = await prisma.product.findMany({
        where: { id: {
            in: productIds.map( product => product.productId )
        }}
    })

    // Calculate products' quantity
    const itemsInOrder = productIds.reduce( (total, p) => total + p.quantity, 0)

    // Calculate totals prices
    const { subTotal, tax, total } = productIds.reduce( (totals, item) => {
        const productQuantity = item.quantity
        const product = products.find( p => p.id === item.productId)
        if ( !product ) throw new Error(`${item.productId} doesn't exist - 500`);

        const subTotal = product.price * productQuantity
        
        totals.subTotal += subTotal
        totals.tax += subTotal * 0.15
        totals.total += subTotal * 1.15

        return totals

    }, { subTotal: 0, tax: 0, total: 0 })


    //! Transactions with db -------
    try {
        const prismaTx = await prisma.$transaction( async (tx) => {
            // Step 1: Update products store
            const updatedProductsPromises = products.map( async (product) => {

                // calculate final quantity by product
                const productQuantity = productIds.filter( 
                    p => p.productId === product.id
                ).reduce( ( acc, item ) => acc + item.quantity, 0);

                if( productQuantity === 0 ) {
                    throw new Error(`${product.id} there are not specified quantity`)
                }

                return tx.product.update({
                    where: { id: product.id},
                    data: {
                        inStock: {decrement: productQuantity}
                        
                    }
                })
            })

            const updatedProducts = await Promise.all( updatedProductsPromises )

            // Verify negative inStock values
            updatedProducts.forEach( prod => {
                if(prod.inStock < 0) {
                    throw new Error(`${prod.title} doesn't have enogh stock`)
                }
            })



            // Step 2: Create order and details
            const order = await tx.order.create({
                data: {
                    userId: session.user.id,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,

                    OrderItem: {
                        createMany: {
                            data: productIds.map( p => ({
                                productId: p.productId,
                                quantity: p.quantity,
                                size: p.size,
                                price: products.find( prod => prod.id === p.productId)?.price ?? 0
                            }))
                        }
                    },
                }
            })

            // Step 2.1: Validate if price is 0 throw an error (optional)

            // Step 3: Post order's address
            const { country, ...restAddress } = address
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id
                }
            })

            // return transaction
            return {
                order: order,
                updatedProducts,
                orderAddress
            }
        })

        return {
            ok: true,
            order: prismaTx.order
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error.message
        }
    }
}