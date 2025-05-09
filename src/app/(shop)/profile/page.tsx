import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth()

    if(!session?.user){
        // redirect('/auth/login?returnTo=/profile')
        redirect('/auth/login')

    }
  
  
  return (
    <div>
        <Title 
            title="Profile"
        />
        <div className="flex gap-2">
          <p className="font-bold">Name: </p>
          <p>{session.user?.name} </p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold">E-mail: </p>
          <p>{session.user?.email} </p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold">User ID: </p>
          <p>{session.user?.id} </p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold">Role: </p>
          <p>{session.user?.role} </p>
        </div>

    </div>
  )
}