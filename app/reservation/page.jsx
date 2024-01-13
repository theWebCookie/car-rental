'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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

  const carType = searchParams.get('carType') || '';
  const transmission = searchParams.get('transmission') || '';
  const priceOrder = searchParams.get('priceOrder') || 'desc';

  const fetchAndFilterCars = async () => {
    setIsLoading(true);
    const fetchedCars = await fetchCars();
    setCars(fetchedCars);

    let filteredResult = [...fetchedCars];

    if (carType) {
      filteredResult = filteredResult.filter((car) => car.carType === carType);
    }

    if (transmission) {
      filteredResult = filteredResult.filter((car) => car.transmission === transmission);
    }

    filteredResult.sort((a, b) => (priceOrder === 'asc' ? a.price - b.price : b.price - a.price));

    setFilteredCars(filteredResult);
    setIsLoading(false);
  };

  const handleRouteChange = () => {
    fetchAndFilterCars();
  };

  useEffect(() => {
    fetchAndFilterCars();
  }, [carType, transmission, priceOrder]);

  useEffect(() => {
    handleRouteChange();
  }, [searchParams]);

  return (
    <div className='reservation'>
      <div className='reservation-wrapper'>
        <div className='reservation-info'>
          <div className='reservation-inputs'>
            <span>Data rezerwacji</span>
            <InputContainer />
            <button>Wyszukaj samochod</button>
          </div>
          <div className='reservation-filters'>
            <span className='filter-heading'>Filtry</span>
            <FilterContainer />
          </div>
        </div>
        <div className='reservation-cars'>
          {isLoading ? <p>Ładowanie...</p> : filteredCars.length === 0 || cars.length === 0 ? <p>Brak dostępnych samochodów</p> : null}
          {filteredCars.map((car) => (
            <Car
              id={car.id}
              key={car.id}
              src={car.imageUri}
              title={car.title}
              fuel={car.fuelType}
              transmission={car.transmission}
              fuelUsage={car.fuelUsage}
              luggage={car.luggage}
              doors={car.doors}
              seats={car.seats}
              alt={car.title}
              description={car.description}
              price={car.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
