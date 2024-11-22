
export default function ProductByIdPage({params}: {params: { slug: string}}) {
  return (
    <div>
      <h1>Product by Id Page</h1>
      <h1>{params.slug}</h1>
    </div>
  );
}