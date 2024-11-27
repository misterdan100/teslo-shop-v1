import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { ValidCategories } from "@/interfaces";
import { notFound } from "next/navigation";

export const revalidate = 60

interface Props {
  params: {
    gender: ValidCategories;
  };
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? Number(searchParams.page) : 1 
  const take = 8
  const allowedCategories: ValidCategories[] = ["kid", "men", "women", 'unisex'];

  // check if id url is allowed
  if (!allowedCategories.includes(gender)) notFound();

  // label to the subtitle depending of id param
  const labels: Record<ValidCategories, string> = {
    kid: 'kids', 
    men: 'men', 
    women: 'women', 
    unisex: 'unisex', 
  }

  const filteredProducts = await getPaginatedProductsWithImages({page, take, gender: gender})

  return (
    <>
      <Title
        title={gender}
        subtitle={`Products for ${labels[gender]}`}
        className="capitalize"
      />

      <ProductGrid products={filteredProducts.products} />

      <Pagination totalPages={filteredProducts.totalPages}/>
    </>
  );
}
