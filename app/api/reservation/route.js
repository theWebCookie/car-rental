import { cookies } from 'next/headers';

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const res = await fetch('http://localhost:5046/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  console.log('POST', res);
  if (!res.ok) {
    const errorData = await res.json();
    return new Response(JSON.stringify({ message: errorData.message || 'Reservation failed.' }));
  }
  return new Response(JSON.stringify({ message: 'Success!' }));
}

export async function PUT(request) {
  const body = await request.json();
  const token = cookies().get('token').value;
  const { startDate, endDate, carId } = body;
  const carUpdateBody = {
    availabilityStart: startDate,
    availabilityEnd: endDate,
  };
  const carUpdateRes = await fetch(`http://localhost:5046/cars/updateavailability/${carId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carUpdateBody),
  });
  console.log('DATY:', carUpdateBody);
  console.log('PUT', carUpdateRes);
  if (!carUpdateRes.ok) {
    const errorData = await res.json();
    return new Response(JSON.stringify({ message: errorData.message || 'Update car failed.' }));
  }
  return new Response(JSON.stringify({ message: 'Success!' }));
}

export const dynamic = 'force-dynamic';
