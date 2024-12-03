import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[]

    getTotalItems: () => number
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    }

    addProductToCart: (product: CartProduct) => void
    updateProductQuantity: (product: CartProduct) => void
    removeProduct: (product: CartProduct) => void
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

            getSummaryInformation: () => {
                const { cart } = get()

                const subTotal = cart.reduce( (total, item) => total + (item.price * item.quantity), 0)

                const tax = subTotal * 0.15
                const total = subTotal + tax
                const itemsInCart = cart.reduce( ( total, item ) => total + item.quantity, 0)

                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart
                }
            },

            updateProductQuantity: (product: CartProduct) => {
                const { cart } = get()

                const updatedCart = cart.map( item => {
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
            },
            removeProduct: (product: CartProduct) => {
                const { cart } = get()

                const updatedCart = cart.filter( item => {
                    if(!(item.id === product.id && item.size === product.size)) return item
                })

                set({
                    cart: updatedCart
                })
            }
        })
        ,
        {
            name: 'shopping-cart',
        }
    )   
)