import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductsInCart } from "./ui/ProductsInCart";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {

  if(!productsInCart.length) redirect('/empty')


  return (
    <div className="flex justify-center items-center mb-20 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col  ">
            <span className="text-xl ">Add more items</span>
            <Link href="/" className="underline mb-5">
              Keep buying
            </Link>

            {/* Cart Items */}
            <ProductsInCart />
            </div>

          {/* Summary / Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 self-start">
            <h2 className="text-2xl mb-2 font-semibold">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Taxes (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl font-semibold">Total: </span>
              <span className="text-right mt-5 text-2xl font-semibold">$ 200</span>



            </div>

            <div className="mt-5 mb-2 w-full">
              <Link 
                href={`/checkout/address`}
                className="flex btn-primary justify-center"
              >Checkout</Link>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
}
