export const fetchCars = async () => {
  const res = await fetch('/api/fleet', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    alert(errorData.message);
  } else {
    const data = await res.json();
    return data;
  }
};
