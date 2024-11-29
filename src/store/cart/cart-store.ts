import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[]

    getTotalItems: () => number

    addProductToCart: (product: CartProduct) => void
    updateProductQuantity: (product: CartProduct) => void
}

export const useCartStore = create<State>()(

    // persist record state in LocalStorage
    persist(

        (set, get) => ({
            cart: [],

            getTotalItems: () => {
                const { cart } = get()

                return cart.reduce( ( total, item ) => total + item.quantity, 0)
            },

            updateProductQuantity: (product: CartProduct) => {

                // if quantity is 1 => delete product from cart
                if(product.quantity === 0) {
                    const updatedCart = get().cart.filter( item => !(item.id === product.id && item.size === product.size))
                    set({
                        cart: updatedCart
                    })

                    return
                }

                const updatedCart = get().cart.map( item => {
                    if(item.id === product.id && item.size === product.size) {
                        item.quantity = product.quantity
                        return item
                    }
                    return item
                })

                set({
                    cart: updatedCart
                })

            },

    
            addProductToCart: (product: CartProduct) => {
                const { cart } = get()
    
                // Check if product is already in the cart with the same size
                const productInCart = cart.some((item) => 
                    item.id === product.id && item.size === product.size
                )
    
                if(!productInCart) {
                    set({
                        cart: [...cart, product]
                    })
                    return
                }
    
                // 2. We know the product exist in the cart by size. Encrease the product's size
                const updatedCartProducts = cart.map(item => {
                    if(item.id === product.id && item.size === product.size) {
                        item.quantity = item.quantity + product.quantity
                        return item
                    }
                    return item
                })
    
                set({
                    cart: updatedCartProducts
                })
            }
        })

        ,
        {
            name: 'shopping-cart',
        }
    )

    
)