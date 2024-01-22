export async function GET(request, { params }) {
  const res = await fetch(`http://localhost:5046/cars/${params.id}`, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok) {
    const errorData = await res.json();
    return new Response(JSON.stringify({ message: errorData.message || 'Car fetch failed.' }));
  }
  return Response.json(data);
}
