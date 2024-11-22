
export default function OrderByIdPage({params}: { params: { id: string}}) {
  return (
    <div>
      <h1>OrderByIdPage</h1>
      <h1>{params.id}</h1>
    </div>
  );
}