export const revalidate = 0; // to force render every time page is request
export const dynamic = "force-dynamic"; // Next.js always revalidate, no cache

// https://tailwindcomponents.com/component/hoverable-table
import {
  getOrdersByUser,
  getPaginatedOrders,
  getPaginatedProductsWithImages,
} from "@/actions";
import { auth } from "@/auth.config";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = 8;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    take,
  });

  return (
    <>
      <Title title="Products manager" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          New Product
        </Link>
      </div>

      <div className="mb-10">
        <table className="shadow-md rounded-lg min-w-full overflow-hidden">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-sm text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-sm text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-sm text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-sm text-left"
              >
                Gender
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-sm text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 text-sm text-left"
              >
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white hover:bg-gray-100 border-b transition duration-300 ease-in-out"
              >
                <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage 
                      src={product.images[0]}
                      alt={`${product.title} image`}
                      width={80}
                      height={80}
                      className="rounded w-20 h-20 object-cover"
                    />
                  </Link>
                </td>
                <td className="px-6 py-4 font-light text-gray-900 text-sm whitespace-nowrap">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 text-sm whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="px-6 py-4 font-light text-gray-900 text-sm whitespace-nowrap">
                  {product.gender}
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 text-sm whitespace-nowrap">
                  {product.inStock}
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 text-sm whitespace-nowrap">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
