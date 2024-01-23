import { cookies } from 'next/headers';

const fetchUserData = async (userId, token) => {
  try {
    const response = await fetch(`http://localhost:5046/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error(`Błąd podczas pobierania danych użytkownika. Status: ${response.status}`);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error('Błąd podczas pobierania danych użytkownika', error);
    return null;
  }
};

const fetchCarsByIds = async (carIds) => {
  const carsPromises = carIds.map(async (id) => {
    try {
      const response = await fetch(`http://localhost:5046/cars/${id}`, { cache: 'no-store' });
      if (!response.ok) {
        const errorData = await res.json();
        return new Response(JSON.stringify({ message: errorData.message || `Data fetch failed. Status: ${res.status}` }));
      }
      return response.json();
    } catch (error) {
      const errorData = await res.json();
      return new Response(JSON.stringify({ message: errorData.message || `Data fetch failed. Status: ${res.status}` }));
    }
  });

  const cars = await Promise.all(carsPromises);
  return cars;
};

export async function GET() {
  const userId = cookies().get('userId').value;
  const token = cookies().get('token').value;
  const userData = await fetchUserData(userId, token);

  if (!userData) {
    return new Response(JSON.stringify({ message: 'Failed to fetch user data.' }));
  }

  const res = await fetch(`http://localhost:5046/reservations/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json();
    return new Response(JSON.stringify({ message: errorData.message || `Data fetch failed. Status: ${res.status}` }));
  }

  const data = await res.json();
  if (data.length === 0) {
    return Response.json({ userData, cars: [], reservationInfo: [] });
  }

  const carIds = data.map((reservation) => reservation.carId);
  const cars = await fetchCarsByIds(carIds);
  const reservationInfo = data;

  return Response.json({ userData, cars, reservationInfo });
}
