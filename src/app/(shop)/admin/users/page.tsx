export const revalidate = 0; // to force render every time page is request
export const dynamic = 'force-dynamic' // Next.js always revalidate, no cache

// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser, getPaginatedOrders, getPaginatedUsers } from '@/actions';
import { Title } from '@/components';


import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import { UsersTable } from './ui/UsersTable';

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers()

  if( !ok ) {
    redirect('/auth/login')
  }


  return (
    <>
      <Title title="Users control" />

      <div className="mb-10">
        <UsersTable users={users}/>
      </div>
    </>
  );
}