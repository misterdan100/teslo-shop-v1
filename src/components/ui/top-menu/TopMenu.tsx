'use client'

import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"


export const TopMenu = () => {
    const openSideMenu = useUIStore(state => state.openSideMenu)
    const getTotalItems = useCartStore( state => state.getTotalItems())

    const [loaded, setLoaded] = useState(false)

    useEffect(() =>{
        setLoaded(true)
    },)

  return (
    <nav 
        className="flex px-5 justify-between items-center w-full"
    >
        {/* Logo */}
        <div>
            <Link
                href='/'
            >
                <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                <span> | Shop</span>
            </Link>
        </div>

        {/* Center Menu */}
        <div className="hidden sm:block">
            <Link
                href='/gender/men'
                className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            >Men</Link>
            <Link
                href='/gender/women'
                className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            >Women</Link>
            <Link
                href='/gender/kid'
                className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
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
                href='/cart'
                className="px-2"
                >
                <div
                    className="relative"
                >
                    {
                        (loaded && getTotalItems > 0) && (
                            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2">{getTotalItems}</span>
                        )
                    }
                    <IoCartOutline className="w-5 h-5"/>
                </div>
            </Link>
            <button
                className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                onClick={openSideMenu}
            >Menu</button>

        </div>
    </nav>
  )
}
