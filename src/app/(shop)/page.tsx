import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { redirect } from 'next/navigation'

export const revalidate = 60

interface Props {
  searchParams: {
    page?: string
  }
}


export default async function Home({searchParams}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const take = 8
  const {products, totalPages} = await getPaginatedProductsWithImages({page, take})

  // Redirec if there are not products in that page
  if(products.length === 0 ) redirect('/')

  return (
    <>
      <Title 
        title='Shop'
        subtitle='All products'
        className='mb-2'
      /> 

      <ProductGrid 
        products={products}
      />

      <Pagination 
        totalPages={totalPages}
      />
    </>
  )
}
