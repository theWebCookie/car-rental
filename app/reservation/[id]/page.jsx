'use client';
import { useEffect, useState } from 'react';
import { fetchCarById } from '@/app/lib/fetchCars';
import Car from '@/app/ui/car/car';
import '@/app/ui/reservation/reservationId.css';
import { getCookies } from '@/app/lib/cookies';
import Button from '@/app/ui/button/button';
import Image from 'next/image';
import loadingGif from '../../../public/loading-gif.gif';
import { useRouter } from 'next/navigation';

export default function ReservationPage({ params }) {
  const [car, setCar] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [userId, setUserId] = useState();
  const [optionIds, setOptionIds] = useState('');
  const [isReqLoading, setIsReqLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    const getAllCookies = async () => {
      const cookie = (await getCookies())?.find((cookie) => cookie.name == 'userId');
      setUserId(cookie.value);
    };

    const fetchCar = async () => {
      const fetchedCar = await fetchCarById(params.id);
      setCar(fetchedCar);

      const minStartDate = new Date(car.availabilityStart);
      minStartDate.setDate(minStartDate.getDate() + 1);

      const minEndDate = new Date(minStartDate);
      minEndDate.setDate(minEndDate.getDate() + 1);

      setStartDate(minStartDate);
      setEndDate(minEndDate);

      setIsLoading(false);
    };

    fetchCar();
    getAllCookies();
  }, [userId, params.id]);

  const minStartDate = new Date(car.availabilityStart);
  minStartDate.setDate(minStartDate.getDate() + 1);

  const minEndDate = new Date(minStartDate);
  minEndDate.setDate(minEndDate.getDate() + 1);

  const [startDate, setStartDate] = useState(minStartDate);
  const [endDate, setEndDate] = useState(minEndDate);

  const optionsTable = [
    { id: 1, name: 'Fotelik dziecięcy - 9-36kg', price: 20 },
    { id: 2, name: 'Końcowe mycie pojazdu', price: 30 },
    { id: 3, name: 'Pomoc drogowa', price: 75 },
    { id: 4, name: 'Dodatkowe ubezpieczenie', price: 100 },
  ];

  const calculateOptionsCost = () => {
    let optionCost = 0;
    optionsTable.forEach((option) => {
      if (selectedOptions[option.name]) {
        optionCost += option.price;
      }
    });
    return optionCost;
  };

  const calculateTotalCarCost = () => {
    const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return car.price * daysDifference;
  };

  const handleOptionChange = (optionName, optionId) => {
    const updatedOptions = { ...selectedOptions, [optionName]: !selectedOptions[optionName] };

    if (optionIds.includes(optionId.toString())) {
      let newOptionIds = optionIds.replace(optionId.toString(), '');
      setOptionIds(newOptionIds);
    } else {
      let newOptionIds = optionIds + optionId.toString();
      setOptionIds(newOptionIds);
    }
    setSelectedOptions(updatedOptions);
  };

  const handleStartDateChange = (newStartDate) => {
    const newEndDate = new Date(newStartDate);
    newEndDate.setHours(newEndDate.getHours() + 24);
    if (new Date(newStartDate) >= new Date(car.availabilityStart)) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    } else {
      alert('Błędna data');
    }
  };

  const handleEndDateChange = (dateValue) => {
    const endDate = new Date(dateValue);
    const startDateObj = new Date(startDate);

    if (startDateObj <= endDate && endDate < new Date(car.availabilityEnd) && endDate > new Date(startDate)) {
      setEndDate(endDate);
    } else {
      alert('Błędna data');
    }
  };

  const formatToInputString = (date, display = false) => {
    const formatedDate = new Date(date);
    const year = formatedDate.getFullYear();
    const month = `0${formatedDate.getMonth() + 1}`.slice(-2);
    const day = `0${formatedDate.getDate()}`.slice(-2);
    const hours = `0${formatedDate.getHours()}`.slice(-2);
    const minutes = `0${formatedDate.getMinutes()}`.slice(-2);
    if (year == 0o1) {
      return 'Dowolnie';
    }
    if (display) return `${day}/${month}/${year}, ${hours}:${minutes}`;
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleReservation = async () => {
    window.scrollTo(0, 0);
    setIsReqLoading(true);
    const price = calculateTotalCarCost() + calculateOptionsCost();
    const reservationBody = {
      startDate: formatToInputString(startDate),
      endDate: formatToInputString(endDate),
      userId: parseInt(userId),
      carId: car.id,
      price,
      options: optionIds,
    };

    const postRes = await fetch('/api/reservation', {
      method: 'POST',
      body: JSON.stringify(reservationBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const putRes = await fetch('/api/reservation', {
      method: 'PUT',
      body: JSON.stringify(reservationBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!postRes.ok) {
      const errorData = await postRes.json();
      console.log(errorData.message);
    }

    if (!putRes.ok) {
      const errorData = await putRes.json();
      console.log(errorData.message);
    }
    setIsReqLoading(false);
    router.push('/account');
  };

  return (
    <>
      {isLoading ? (
        <div className='states'>
          <Image src={loadingGif} width={200} height={200} alt='loading' className='loading' />
        </div>
      ) : (
        <div className='car-reservation-wrapper'>
          <div className='reservation-car-wrapper'>
            <Car car={car} />
          </div>
          <div className='car-reservation-info'>
            <h1>
              Najbliższy okres dostępności auta: {formatToInputString(car.availabilityStart, true)} - {formatToInputString(car.availabilityEnd, true)}
            </h1>
          </div>
          {car && (
            <div className='flex'>
              <div>
                <h2>Opcje:</h2>
                {optionsTable.map((option) => (
                  <div key={option.id} className='car-reservation-checkbox'>
                    <label>
                      <input
                        type='checkbox'
                        checked={selectedOptions[option.name] || false}
                        onChange={() => handleOptionChange(option.name, option.id)}
                      />
                      {option.name} (+{option.price}zł)
                    </label>
                  </div>
                ))}
              </div>
              <div className='flex2'>
                <label>Data odbioru:</label>
                <div>
                  <input
                    type='datetime-local'
                    value={formatToInputString(startDate)}
                    min={formatToInputString(minStartDate)}
                    onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                  />
                </div>
                <label>Data zwrotu:</label>
                <div>
                  <input
                    type='datetime-local'
                    value={formatToInputString(endDate)}
                    min={formatToInputString(minEndDate)}
                    onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                  />
                </div>
              </div>
            </div>
          )}
          {car && (
            <>
              <table>
                <thead>
                  <tr>
                    <td>Samochód</td>
                    <td>Opcje</td>
                    <td>Całkowity koszt</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {calculateTotalCarCost()}zł za {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} dni
                    </td>
                    <td>{calculateOptionsCost()}zł</td>
                    <td>{calculateTotalCarCost() + calculateOptionsCost()}zł</td>
                  </tr>
                </tbody>
              </table>
              <Button text='REZERWUJ' onClick={handleReservation} />
            </>
          )}
          {isReqLoading && (
            <div className='states'>
              <Image src={loadingGif} width={200} height={200} alt='loading' className='loading' />
            </div>
          )}
        </div>
      )}
    </>
  );
}
