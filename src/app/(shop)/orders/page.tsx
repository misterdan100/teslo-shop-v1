export const revalidate = 0; // to force render every time page is request
export const dynamic = 'force-dynamic' // Next.js always revalidate, no cache

// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from '@/actions';
import { Title } from '@/components';


import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser()

  if( !ok ) {
    redirect('/auth/login')
  }


  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="shadow-md rounded-lg min-w-full overflow-hidden">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-sm text-left">
                #ID
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-sm text-left">
                Full Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-sm text-left">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-sm text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>

            {
              orders.map( order => (
                <tr 
                  key={order.id}
                className="bg-white hover:bg-gray-100 border-b transition duration-300 ease-in-out">

                  <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">
                    {order.id.split('-').at(-1)}
                  </td>
                  <td className="px-6 py-4 font-light text-gray-900 text-sm whitespace-nowrap">
                    {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                  </td>
                  <td className="flex items-center px-6 py-4 font-light text-gray-900 text-sm whitespace-nowrap">
                    {
                      order.isPaid ? (
                        <>
                        <IoCardOutline className="text-green-800" />
                        <span className='mx-2 text-green-800'>Paid</span>
                        </>
                      ) : (
                        <>
                        <IoCardOutline className="text-red-800" />
                        <span className='mx-2 text-red-800'>Not Paid</span>
                        </>
                      )
                    }

                  </td>
                  <td className="px-6 font-light text-gray-900 text-sm">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      See order
                    </Link>
                  </td>

                </tr>
              ))
            }

            

          

          </tbody>
        </table>
      </div>
    </>
  );
}