'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Car from '../ui/car/car';
import '../ui/fleet/fleet.css';
import { fetchCars } from '../lib/fetchCars';

export default function Fleet() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = [
    { id: 0, src: '/fleet/hatchback.svg', alt: 'Hatchback', carType: 'hatchback' },
    { id: 1, src: '/fleet/sedan.svg', alt: 'Sedan', carType: 'sedan' },
    { id: 2, src: '/fleet/carTruck.svg', alt: 'Dostawcze', carType: 'dostawcze' },
    { id: 3, src: '/fleet/carVan.svg', alt: 'Van', carType: 'van' },
  ];

  const fetchCarsFromApi = async () => {
    setIsLoading(true);
    const fetchedCars = await fetchCars();
    setCars(fetchedCars);
    setFilteredCars(fetchedCars);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCarsFromApi();
  }, []);

  const handleFilter = (carType) => {
    console.log(carType);
    const result = cars.filter((car) => car.carType == carType);
    setFilteredCars(result);
  };

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
          {isLoading ? <p>Ładowanie...</p> : filteredCars.length === 0 || cars.length === 0 ? <p>Brak dostępnych samochodów</p> : null}
          {filteredCars.map((car) => (
            <Car key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
