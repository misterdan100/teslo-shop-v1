import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

export const revalidate = 604800 // 7 dias

interface Props {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
  const { slug } = params
  const product = await getProductBySlug( slug )


  return {
    title: `${product?.title} - Teslo | Shop`,
    description: product?.description,
    // openGraph: {
      // images: [`/products/${product?.images[1]}`],
      // title: `${product?.title} - Teslo | Shop`,
      // description: product?.description,
    // }
  }
}

export default async function ProductByIdPage({params}: Props) {
  const { slug } = params

  const product = await getProductBySlug( slug )


  if(!product) notFound()

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
        <div className="col-span-1 md:col-span-2">

          {/* Mobile Slideshow */}
          <ProductMobileSlideShow 
            images={product.images}
            title={product.title}
            className={`block md:hidden`}
            />

          {/* Desktop Slideshow */}
          <ProductSlideShow 
            images={product.images}
            title={product.title}
            className={`hidden md:block`}
          />
        </div>

      {/* Details */}
        <div className="col-span-1 px-5">
          <StockLabel 
            slug={product.slug}
          />

          <h1 className={`${titleFont.className} antialiased font-bold text-2xl`}
          >{product.title}</h1>

          <p className="text-lg mb-5 font-semibold">$ {product.price}</p>

          <AddToCart 
            product={product}
          />


          {/* Description  */}
          <h3 className="font-bold text-sm mb-1">Description</h3>
          <p className="font-light">{product.description}</p>
        </div>
    </div>
  );
}