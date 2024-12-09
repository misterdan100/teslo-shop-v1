'use server'

import { Address } from "@/interfaces"
import prisma from "@/lib/prisma"

export const setUserAddress = async (address: Address, userId: string) => {
    try {

        const newAddress = await createOrReplaceAddress( address, userId)

        return {
            ok: true,
            address: newAddress
        }

        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Address couldnt be created'
        }
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: {
                userId: userId
            }
        })

        const addressToSave = {
            userId: userId,
            countryId: address.country,
            address: address.address,
            address2: address.address2,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            city: address.city
        }

        if( !storeAddress ) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            })

            return newAddress
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId: userId
            },
            data: addressToSave
        })

        return updatedAddress
        
    } catch (error) {
        console.log(error)
        throw new Error('Address couldnt be created')
    }
}

