import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";


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
            <ProductsInCart />
            
          </div>

          {/* Summary / Checkout */}
          <PlaceOrder />


        </div>
      </div>
    </div>
  );
}
