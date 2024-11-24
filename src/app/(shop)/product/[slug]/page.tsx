import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string
  }
}

export default function ProductByIdPage({params}: Props) {
  const { slug } = params

  const product = initialData.products.find(product => product.slug === slug)

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
          <h1 className={`${titleFont.className} antialiased font-bold text-2xl`}
          >{product.title}</h1>

          <p className="text-lg mb-5 font-semibold">$ {product.price}</p>

          {/* Select Sizes */}
          <SizeSelector 
            selectedSize={product.sizes[0]}
            availableSizes={product.sizes}
          />



          {/* Select quantity */}
          <QuantitySelector quantity={2}/>



          {/* Button add to cart */}
          <button
            className="btn-primary my-5"
          >Add to cart</button>


          {/* Description  */}
          <h3 className="font-bold text-sm mb-1">Description</h3>
          <p className="font-light">{product.description}</p>
        </div>
    </div>
  );
}