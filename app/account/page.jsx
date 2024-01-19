'use client';
import { useEffect, useState } from 'react';
import '../ui/account/account.css';
import AccountCar from '../ui/accountCar/accountCar';
import { fetchReservationByUserId } from '../lib/fetchReservations';

export default function Account() {
  const [reservedCars, setReservedCars] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservationsFromApi = async () => {
      setIsLoading(true);
      const [userData, cars, reservationInfo] = await fetchReservationByUserId();
      setUserInfo(userData);
      setReservedCars(cars);
      setResInfo(reservationInfo);
      setIsLoading(false);
    };
    fetchReservationsFromApi();
  }, []);

  console.log(resInfo);

  return (
    <div className='account'>
      <div className='account-wrapper'>
        <div className='account-info'>
          <div>
            <h1>Informacje</h1>
            <div className='account-personal'>
              <p>
                Imię i nazwisko: {userInfo.firstName} {userInfo.seccondName}
              </p>
              <p>Email: {userInfo.email}</p>
            </div>
          </div>
          <div>
            <h2>Moje rezerwacje</h2>
            <div className='account-reservaitons'>
              {isLoading ? <p>Ładowanie...</p> : reservedCars.length === 0 ? <p>Brak dostępnych samochodów</p> : null}
              {reservedCars.map((car, index) => {
                return <AccountCar key={car.id} car={car} info={resInfo[index]} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
