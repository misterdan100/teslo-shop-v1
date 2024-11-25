import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Review and Pay" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col  ">
            <span className="text-xl ">Modify order</span>
            <Link href="/cart" className="underline mb-5">
              Check cart
            </Link>

            {/* Cart Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>$ {product.price} x 3</p>
                  <p className="font-semibold">Subtotal: $ {product.price * 3}</p>

                </div>
              </div>
            ))}
          </div>

          {/* Summary / Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 self-start">
            <h2 className="text-2xl mb-2 font-semibold">Delivery Address</h2>

            <div className="grid  mb-10">
              <span className="text-xl">Daniel Merchan</span>
              <span>Av. Siempre viva 123</span>
              <span>Medellin</span>
              <span>Zip code: 12234</span>
              <span>Phone: +57 310 598 2541</span>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"/>


            <h2 className="text-2xl mb-2 font-semibold">Order Summary</h2>

            <div className="grid grid-cols-2 gap-2">
              <span>No. Products</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Shipping</span>
              <span className="text-right">Free</span>

              <span>Sales Tax (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl font-semibold">Total Due: </span>
              <span className="text-right mt-5 text-2xl font-semibold">$ 200</span>



            </div>

            <div className="mt-5 mb-2 w-full">

              {/* Disclaimer */}
              <p className="mb-5">
                <span className="text-sm">
                Doing click on Place Order, you acept our <Link href='#' className="underline"> terms and conditions.</Link>
                </span>

              </p>

              <Link 
                href={`/orders/123`}
                className="flex btn-primary justify-center"
              >Place Order</Link>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
}
