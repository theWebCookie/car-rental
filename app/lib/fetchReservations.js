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

    const userData = data.userData;
    const cars = data.cars || [];
    const reservationInfo = data.reservationInfo || [];

    return [userData, cars, reservationInfo];
  }
};
