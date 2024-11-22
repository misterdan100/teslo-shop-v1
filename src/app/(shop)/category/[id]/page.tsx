
export default function CategoryPage({params}: {params: {id: string}}) {

  return (
    <div>
      <h1>Category Page</h1>
      {params.id}
    </div>
  );
}