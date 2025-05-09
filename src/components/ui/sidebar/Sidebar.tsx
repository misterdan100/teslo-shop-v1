'use client'

import { logout } from "@/actions"
import { useUIStore } from "@/store"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {
    const isSlideMenuOpen = useUIStore(state => state.isSideMenuOpen)
    const closeSideMenu = useUIStore(state => state.closeSideMenu)
    
    const { data: session } = useSession()
    const isAuthenticated = !!session?.user
    const isAdmin = session?.user.role === 'admin'
  
  return (
    <div>
      {isSlideMenuOpen && (
        <>
          {/* Black Background */}
          <div className="top-0 left-0 z-10 fixed bg-black opacity-30 w-screen h-screen" />

          {/* Blur */}
          <div
            onClick={closeSideMenu}
            className="top-0 left-0 z-10 fixed backdrop-filter backdrop-blur-sm w-screen h-screen fade-in"
          />
        </>
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "top-0 right-0 z-20 fixed bg-white shadow-2xl p-5 w-[500px] h-screen transition-all duration-300 transform",
          {
            "translate-x-full": !isSlideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="top-5 right-5 absolute text-gray-500 cursor-pointer"
          onClick={closeSideMenu}
        />

        {/* Inputs */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="top-2 left-2 absolute" />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 py-1 pr-10 pl-10 border-gray-200 border-b-2 focus:border-blue-500 rounded focus:outline-none w-full text-xl transition-all"
          />
        </div>

        {/* Log in & Log out condicion */}
        { isAuthenticated ? (
          <>
            {/* Menu Options */}
            <Link
              href="/profile"
              className="flex items-center hover:bg-gray-100 mt-10 p-2 rounded-md transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-gray-600 text-xl"><span className="font-bold text-black">{session.user.name.split(' ')[0]}</span> Profile</span>
            </Link>

            <Link
              href="/orders"
              className="flex items-center hover:bg-gray-100 mt-10 p-2 rounded-md transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>

            <button
              className="flex items-center hover:bg-gray-100 mt-10 p-2 rounded-md transition-all"
              onClick={() => logout()}
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Log out</span>
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="flex items-center hover:bg-gray-100 mt-10 p-2 rounded-md transition-all"
            onClick={() => closeSideMenu()}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Sign in</span>
          </Link>
        )}

        {/* Line Separate */}
        <div className="bg-gray-200 my-10 w-full h-px" />

        {/* Options for admin */}
        { isAdmin && (
          <>
          <span
            className="ml-4 font-bold text-lg"
          >Admin Section</span>
            <Link
              href="/admin/products"
              className="flex items-center hover:bg-gray-100 mt-10 p-2 rounded-md transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Products</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center hover:bg-gray-100 mt-10 p-2 rounded-md transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center hover:bg-gray-100 mt-10 p-2 rounded-md transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Users</span>
            </Link>
          </>
        )}

      </nav>
    </div>
  );
}