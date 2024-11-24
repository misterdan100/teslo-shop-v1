import { ProductGrid, Title } from "@/components";
import { ValidCategories } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: ValidCategories;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  const allowedCategories: ValidCategories[] = ["kid", "men", "women", 'unisex'];

  // check if id url is allowed
  if (!allowedCategories.includes(id)) notFound();

  // label to the subtitle depending of id param
  const labels: Record<ValidCategories, string> = {
    kid: 'kids', 
    men: 'men', 
    women: 'women', 
    unisex: 'unisex', 
  }

  const filteredProductsById = initialData.products.filter(
    (product) => product.gender === id
  );

  return (
    <>
      <Title
        title={id}
        subtitle={`Products for ${labels[id]}`}
        className="capitalize"
      />

      <ProductGrid products={filteredProductsById} />
    </>
  );
}
