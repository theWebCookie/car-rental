export const fetchReservationByUserId = async () => {
  const res = await fetch('/api/account', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    alert(errorData.message);
  } else {
    const data = await res.json();
    return [data.userData, data.cars, data.reservationInfo];
  }
};
