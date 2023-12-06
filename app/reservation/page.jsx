'use client';

import { useEffect, useState } from 'react';
import Car from '../ui/car/car';
import FilterContainer from '../ui/reservationInputs/filters/FilterContainer';
import InputContainer from '../ui/reservationInputs/inputs/inputContainer';
import '../ui/reservation/reservation.css';
import { useSearchParams } from 'next/navigation';

export default function Reservation() {
  const [cars, setCars] = useState([
    {
      id: 0,
      src: '/mockBmw.png',
      title: 'BMW serii 1 Automat',
      fuel: 'Benzyna',
      luggage: '380',
      doors: '5',
      seats: '5',
      transmission: 'Automatyczna',
      fuelUsage: '6.3',
      carType: 'automat',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est suscipit odio blanditiis quo commodi illum iure qui, fuga repellendus accusantium. Amet nesciunt in ullam possimus facere accusantium aperiam expedita quasi sint vel libero provident laudantium nisi, blanditiis obcaecati nihil at.',
    },
    {
      id: 1,
      src: '/mockBmw.png',
      title: 'BMW serii 1 Automat',
      fuel: 'Benzyna',
      luggage: '380',
      doors: '5',
      seats: '5',
      transmission: 'Manualna',
      fuelUsage: '7',
      carType: 'osobowe',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis labore quasi nesciunt sequi quisquam magnam facilis accusamus, odio voluptates dolorem!',
    },
  ]);

  const searchParams = useSearchParams();
  const search = searchParams.get('carType');
  //add filter logic

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
          {cars.map((car) => (
            <Car
              id={car.id}
              key={car.id}
              src={car.src}
              title={car.title}
              fuel={car.fuel}
              transmission={car.transmission}
              fuelUsage={car.fuelUsage}
              luggage={car.luggage}
              doors={car.doors}
              seats={car.seats}
              alt={car.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
