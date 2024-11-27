import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderByIdPage({ params }: Props) {
  const { id } = params;

  //  Todo: verify id

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': false,
                  'bg-green-700': true
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pending payment</span> */}
              <span className="mx-2">Paid order</span>
            </div>

            {/* Cart Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>$ {product.price} x 3</p>
                  <p className="font-semibold">
                    Subtotal: $ {product.price * 3}
                  </p>
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
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

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
              <span className="text-right mt-5 text-2xl font-semibold">
                $ 200
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': false,
                  'bg-green-700': true
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pending payment</span> */}
              <span className="mx-2">Paid order</span>
            </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
