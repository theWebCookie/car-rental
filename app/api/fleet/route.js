export async function GET() {
  const res = await fetch('http://localhost:5046/cars', { next: { revalidate: 3600 } });
  if (!res.ok) {
    const errorData = await res.json();
    return new Response(JSON.stringify({ message: errorData.message || `Data fetch failed. Status: ${res.status}` }));
  }
  const data = await res.json();
  return Response.json(data);
}
