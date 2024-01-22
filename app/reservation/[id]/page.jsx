'use client';
import { useEffect, useState } from 'react';
import { fetchCarById } from '@/app/lib/fetchCars';
import Car from '@/app/ui/car/car';
import '@/app/ui/reservation/reservationId.css';
import { getCookies } from '@/app/lib/cookies';

export default function ReservationPage({ params }) {
  const [car, setCar] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [userId, setUserId] = useState();

  useEffect(() => {
    const getAllCookies = async () => {
      const cookie = (await getCookies())?.find((cookie) => cookie.name == 'userId');
      setUserId(cookie.value);
    };
    getAllCookies();
  }, []);

  console.log(userId);

  const today = new Date();
  const minEndDate = new Date(today);
  minEndDate.setDate(minEndDate.getDate() + 1);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(minEndDate);

  useEffect(() => {
    const fetchCar = async () => {
      const fetchedCar = await fetchCarById(params.id);
      setCar(fetchedCar);
    };
    fetchCar();
  }, [params.id]);

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

  const handleOptionChange = (optionName) => {
    const updatedOptions = { ...selectedOptions, [optionName]: !selectedOptions[optionName] };
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
    if (new Date(endDate) <= new Date(car.availabilityEnd) || new Date(car.availabilityEnd).getFullYear() == 0o1) {
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
      return 'Brak';
    }
    if (display) return `${day}/${month}/${year} - ${hours}:${minutes}`;
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleReservation = async () => {
    const price = calculateTotalCarCost() + calculateOptionsCost();
    const reservationBody = {
      startDate: formatToInputString(startDate),
      endDate: formatToInputString(endDate),
      userId: parseInt(userId),
      carId: car.id,
      price,
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
  };

  return (
    <div>
      <div>
        <Car car={car} />
      </div>
      <div>
        <h1>
          Dostępność auta: {formatToInputString(car.availabilityStart, true)} - {formatToInputString(car.availabilityEnd, true)}
        </h1>
      </div>
      <div>
        <h2>Opcje:</h2>
        {optionsTable.map((option) => (
          <div key={option.name}>
            <label>
              <input type='checkbox' checked={selectedOptions[option.name] || false} onChange={() => handleOptionChange(option.name)} />
              {option.name} (+{option.price}zł)
            </label>
          </div>
        ))}
      </div>

      <div>
        <h2>Koszt rezerwacji</h2>
        <div>
          <label>Start date:</label>
          <input
            type='datetime-local'
            value={formatToInputString(startDate)}
            min={formatToInputString(today)}
            onChange={(e) => handleStartDateChange(new Date(e.target.value))}
          />
        </div>
        <div>
          <label>End date:</label>
          <input
            type='datetime-local'
            value={formatToInputString(endDate)}
            min={formatToInputString(minEndDate)}
            onChange={(e) => handleEndDateChange(new Date(e.target.value))}
          />
        </div>
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
        <button onClick={handleReservation}>REZERWUJ</button>
      </div>
    </div>
  );
}
