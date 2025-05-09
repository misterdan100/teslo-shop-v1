import { getCategories, getProductBySlug } from "@/actions"
import { Title } from "@/components"
import { redirect } from "next/navigation"
import { ProductForm } from "./ui/ProductForm"

interface Props {
    params: {
        slug: string
    }
}


export default async function pagePage({params}: Props) {
  const { slug } = params

  // two promises at the same time
  const [ product, categories] = await Promise.all([
    getProductBySlug(slug), 
    getCategories()
  ])


  //Todo: New
  if(!product && slug !== 'new') {
    redirect('/admin/products')
  }

  const title = ( slug === 'new') ? 'New Product' : 'Edit Product'
  
  
  return (
    <>
        <Title title={title} />

        <ProductForm 
            product={product ?? {}}
            categories={categories}
        />


    </>
  )
}