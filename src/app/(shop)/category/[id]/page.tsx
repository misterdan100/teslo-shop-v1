import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

export default function CategoryPage({params}: Props) {
  const { id } = params
  const allowedCategories = ['kids', 'men', 'women']

  if(!allowedCategories.includes(id) ) notFound()

  return (
    <div>
      <h1>Category Page</h1>
      {params.id}
    </div>
  );
}