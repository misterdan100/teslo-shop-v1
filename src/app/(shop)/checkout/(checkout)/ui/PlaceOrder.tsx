'use client'

import { placeOrder } from "@/actions"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { sleep } from "@/utils/sleep"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const address = useAddressStore( state => state.address )

    const clearCart = useCartStore( state => state.clearCart)
    const cart = useCartStore( state => state.cart)
    const getSummaryInformation = useCartStore((state) => state.getSummaryInformation);
    const { itemsInCart, subTotal, tax, total } = getSummaryInformation()

    
    useEffect(() => {
        setLoaded(true)
    }, [])

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true)
        setErrorMessage('')

        const productsToOrder = cart.map( product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }))

        const resp = await placeOrder(productsToOrder, address)
        if( !resp.ok ) {
          setIsPlacingOrder(false)
          setErrorMessage(resp.message)
          return
        }

        //* in this point order is success
        setIsPlacingOrder(false)
        clearCart()
        router.replace(`/orders/${resp.order?.id}`)


    }
  

    if( !loaded ) {
        return <p>Loading...</p>
    }
  
  return (
    <div className="bg-white rounded-xl shadow-xl p-7 self-start">
            <h2 className="text-2xl mb-2 font-semibold">Delivery Address</h2>

            <div className="grid  mb-10">
              <span className="text-xl">{address.firstName} {address.lastName}</span>
              <span>{address.address}</span>
              <span>{address.city}</span>
              <span>Zip code: {address.postalCode}</span>
              <span>Phone: {address.phone}</span>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"/>


            <h2 className="text-2xl mb-2 font-semibold">Order Summary</h2>

            <div className="grid grid-cols-2 gap-2">
                <span>No. Products</span>
                <span className="text-right">{itemsInCart} articles</span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Taxes (15%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="mt-5 text-2xl font-semibold">Total: </span>
                <span className="text-right mt-5 text-2xl font-semibold">
                    {currencyFormat(total)}
                </span>

            </div>

            <div className="mt-5 mb-2 w-full">

              {/* Disclaimer */}
              <p className="mb-5">
                <span className="text-sm">
                Doing click on Place Order, you acept our <Link href='#' className="underline"> terms and conditions.</Link>
                </span>

              </p>

              { errorMessage && (
                <p
                className="text-red-500 mb-2"
                >{errorMessage}</p>
              )}

              <button 

                onClick={ onPlaceOrder }
                className={clsx({
                    'btn-primary': !isPlacingOrder,
                    'btn-disabled': isPlacingOrder
                })}
              >Place Order</button>
            </div>

          </div>
  )
}