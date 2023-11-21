'use client';
import { useState } from 'react';
import Image from 'next/image';
import Car from '../ui/car/car';
import '../ui/fleet/fleet.css';
import useFilteredCars from '../lib/useFilteredCars';

export default function Fleet() {
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
    },
  ]);
  const { filteredCars, handleFilter } = useFilteredCars(cars);

  const filters = [
    { id: 0, src: '/fleet/car.svg', alt: 'Osobowe', carType: 'osobowe' },
    { id: 1, src: '/fleet/carAutomat.svg', alt: 'Automat', carType: 'automat' },
    { id: 2, src: '/fleet/carTruck.svg', alt: 'Dostawcze', carType: 'truck' },
    { id: 3, src: '/fleet/carVan.svg', alt: 'Van', carType: 'van' },
  ];

  return (
    <div className='fleet'>
      <div className='fleet-wrapper'>
        <div className='fleet-filters'>
          {filters.map((filter) => (
            <div key={filter.id}>
              <button onClick={() => handleFilter(filter.carType)}>
                <Image src={filter.src} width={80} height={32} alt={filter.alt} />
                {filter.alt}
              </button>
            </div>
          ))}
        </div>
        <div className='fleet-cars'>
          {filteredCars.map((car) => (
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
