import { getOrderById } from "@/actions";
import { PageNotFound, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { notFound } from "next/navigation";
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

export default async function OrderByIdPage({ params }: Props) {
  const { id } = params;
  if( !id ) {
    notFound()
  }

  const order = await getOrderById(id)
  if( !order ) {
    return <PageNotFound />
  }

  const { subTotal, tax, total, itemsInOrder, OrderAddress, OrderItem, isPaid, } = order
  const { firstName, lastName, address, city, postalCode, phone } = OrderAddress!

  

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
                  'bg-red-500': !isPaid,
                  'bg-green-700': isPaid
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pending payment</span> */}
              <span className="mx-2">Paid order</span>
            </div>

            {/* Cart Items */}
            {OrderItem.map((item) => (
              <div key={item.product.slug} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="mr-5 rounded"
                />

                <div>
                  <p>[{item.size}] - {item.product.title}</p>
                  <p>{currencyFormat(item.price)} x {item.quantity}</p>
                  <p className="font-semibold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary / Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 self-start">
            <h2 className="text-2xl mb-2 font-semibold">Delivery Address</h2>

            <div className="grid  mb-10">
              <span className="text-xl">{firstName} {lastName}</span>
              <span>{address}</span>
              <span>{city}</span>
              <span>Zip code: {postalCode}</span>
              <span>Phone: {phone}</span>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 font-semibold">Order Summary</h2>

            <div className="grid grid-cols-2 gap-2">
              <span>No. Products</span>
              <span className="text-right">{itemsInOrder} articles</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(subTotal)}</span>

              <span>Shipping</span>
              <span className="text-right">Free</span>

              <span>Sales Tax (15%)</span>
              <span className="text-right">{currencyFormat(tax)}</span>

              <span className="mt-5 text-2xl font-semibold">Total Due: </span>
              <span className="text-right mt-5 text-2xl font-semibold">
              {currencyFormat(total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !isPaid,
                  'bg-green-700': isPaid
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
