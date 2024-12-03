import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {


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

            <OrderSummary />

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
