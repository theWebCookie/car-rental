export async function GET() {
  const res = await fetch('https://localhost:5001/fleet');
  if (!res.ok) {
    const errorData = await res.json();
    return new Response(JSON.stringify({ message: errorData.message || `Data fetch failed. Status: ${res.status}` }));
  }
  const data = await res.json();
  return Response.json(data);
}
