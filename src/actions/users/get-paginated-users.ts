import { auth } from "@/auth.config"
import { User } from "@/interfaces"
import prisma from "@/lib/prisma"

export const getPaginatedUsers = async () => {
  
  const session = await auth()

  if(session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'User not authorizated'
    }
  } 

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return {
      ok: true,
      users: users
    }
    
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error getting users'
    }
  }
}