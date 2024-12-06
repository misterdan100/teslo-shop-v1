import { auth } from "@/auth.config"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import React from "react"

interface Props {
    children: React.ReactNode
}

export default async function layout({children}: Props) {
    const session = await auth()

    if(!session) {
        redirect('/auth/login?redirectTo=/checkout/address')
    }
  
  return (
    <>
      {children}
    </>
  )
}