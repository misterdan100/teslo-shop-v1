import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { ValidCategories } from "@/interfaces";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60

 // label to the subtitle depending of id param
 const labels: Record<ValidCategories, string> = {
  kid: 'kids', 
  men: 'men', 
  women: 'women', 
  unisex: 'unisex', 
}

interface Props {
  params: {
    gender: ValidCategories;
  };
  searchParams: {
    page?: string
  }
}

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
  const { gender } = params
  const capitalizedGender = capitalizeWords(gender)

  return {
    title: `${capitalizedGender} Products`,
    description: `Clothe E-commerce for ${capitalizedGender} category`
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? Number(searchParams.page) : 1 
  const take = 8
  const allowedCategories: ValidCategories[] = ["kid", "men", "women", 'unisex'];

  // check if id url is allowed
  if (!allowedCategories.includes(gender)) notFound();

 

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
