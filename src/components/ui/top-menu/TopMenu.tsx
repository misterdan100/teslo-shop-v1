'use client'

import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"


export const TopMenu = () => {
    const openSideMenu = useUIStore(state => state.openSideMenu)
    const getTotalItems = useCartStore( state => state.getTotalItems())

    const [loaded, setLoaded] = useState(false)
    const [fontClass, setFontClass] = useState('')

    useEffect(() =>{
        setLoaded(true)

        setFontClass(titleFont.className)

    },[])

  return (
    <nav 
        className="flex justify-between items-center px-5 w-full"
    >
        {/* Logo */}
        <div>
            <Link
                href='/'
            >
                <span 
                    className={`${fontClass} antialiased font-bold`}
                >
                    Mister
                </span>
                <span> | Shop</span>
            </Link>
        </div>

        {/* Center Menu */}
        <div className="hidden sm:block">
            <Link
                href='/gender/men'
                className="hover:bg-gray-100 m-2 p-2 rounded-md transition-all"
            >Men</Link>
            <Link
                href='/gender/women'
                className="hover:bg-gray-100 m-2 p-2 rounded-md transition-all"
            >Women</Link>
            <Link
                href='/gender/kid'
                className="hover:bg-gray-100 m-2 p-2 rounded-md transition-all"
            >Kids</Link>
        </div>

        {/* Search, Cart, Menu */}
        <div className="flex items-center">
            <Link
                href='/search'
                className="px-2"
                >
                <IoSearchOutline className="w-5 h-5"/>
            </Link>
            <Link
                href={
                    ((getTotalItems === 0 ) && loaded)
                    ? '/empty' : '/cart'
                }
                className="px-2"
                >
                <div
                    className="relative"
                >
                    {
                        (loaded && getTotalItems > 0) && (
                            <span className="-top-2 -right-2 absolute bg-blue-700 px-1 rounded-full font-bold text-white text-xs">{getTotalItems}</span>
                        )
                    }
                    <IoCartOutline className="w-5 h-5"/>
                </div>
            </Link>
            <button
                className="hover:bg-gray-100 m-2 p-2 rounded-md transition-all"
                onClick={openSideMenu}
            >Menu</button>

        </div>
    </nav>
  )
}
