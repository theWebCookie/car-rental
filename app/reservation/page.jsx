'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Car from '../ui/car/car';
import FilterContainer from '../ui/reservationInputs/filters/FilterContainer';
import InputContainer from '../ui/reservationInputs/inputs/inputContainer';
import '../ui/reservation/reservation.css';
import { fetchCars } from '../lib/fetchCars';

export default function Reservation() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const carType = searchParams.get('carType') || '';
  const transmission = searchParams.get('transmission') || '';
  const priceOrder = searchParams.get('priceOrder') || 'desc';
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const city = searchParams.get('city');

  const handleDateChange = (inputType, value) => {
    console.log(`${inputType} changed to ${value}`);
  };

  const fetchAndFilterCars = async () => {
    setIsLoading(true);
    const fetchedCars = await fetchCars();
    setCars(fetchedCars);
    const selectedStart = new Date(startDate);
    const selectedEnd = new Date(endDate);

    let filteredResult = [...fetchedCars];

    if (carType) {
      filteredResult = filteredResult.filter((car) => car.carType === carType);
    }

    if (transmission) {
      filteredResult = filteredResult.filter((car) => car.transmission === transmission);
    }

    if (startDate && endDate) {
      filteredResult = filteredResult.filter((car) => {
        const availabilityStart = car.availabilityStart === '0001-01-01T00:00:00' ? new Date() : new Date(car.availabilityStart);
        const availabilityEnd = car.availabilityEnd === '0001-01-01T00:00:00' ? new Date(2100, 0, 1) : new Date(car.availabilityEnd);
        return selectedStart >= availabilityStart && selectedEnd <= availabilityEnd && selectedStart < selectedEnd;
      });
    }

    if (city) {
      filteredResult = filteredResult.filter((car) => car.city == city);
    }

    filteredResult.sort((a, b) => (priceOrder === 'asc' ? a.price - b.price : b.price - a.price));

    setFilteredCars(filteredResult);
    setIsLoading(false);
  };

  const handleRouteChange = () => {
    setIsLoading(true);
    fetchAndFilterCars();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAndFilterCars();
  }, [carType, transmission, priceOrder]);

  useEffect(() => {
    handleRouteChange();
  }, [searchParams]);

  const resetFilters = () => {
    router.push('/reservation');
  };

  return (
    <div className='reservation'>
      <div className='reservation-wrapper'>
        <div className='reservation-info'>
          <div className='reservation-inputs'>
            <span>Data rezerwacji</span>
            <InputContainer onDateChange={handleDateChange} />
            <button onClick={resetFilters}>Reset filtrów</button>
          </div>
          <div className='reservation-filters'>
            <span className='filter-heading'>Filtry</span>
            <FilterContainer />
          </div>
        </div>
        <div className='reservation-cars'>
          {isLoading ? <p>Ładowanie...</p> : filteredCars.length === 0 || cars.length === 0 ? <p>Brak dostępnych samochodów</p> : null}
          {filteredCars.map((car) => (
            <Car cardType='reservation' key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
