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
      <p>{session.user?.name}</p>
      <p>{session.user?.email}</p>
      <p>{session.user?.id}</p>
      <p>{session.user?.image}</p>
      <p>{session.user?.role}</p>
    </div>
  )
}