'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Car from '../ui/car/car';
import '../ui/fleet/fleet.css';

export default function Fleet() {
  const [cars, setCars] = useState([]);
  const searchParams = useSearchParams();
  const type = searchParams.get('carType');

  const filters = [
    { id: 0, src: '/fleet/car.svg', alt: 'Osobowe', carType: 'osobowe' },
    { id: 1, src: '/fleet/carAutomat.svg', alt: 'Automat', carType: 'automat' },
    { id: 2, src: '/fleet/carTruck.svg', alt: 'Dostawcze', carType: 'truck' },
    { id: 3, src: '/fleet/carVan.svg', alt: 'Van', carType: 'van' },
  ];

  const fetchData = async (type) => {
    let url = '/api/fleet';
    if (type != null && type != '') {
      url = `/api/fleet/${type}`;
    }
    console.log(url);
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.message);
    } else {
      const data = await res.json();
      console.log(data);
      setCars(data);
    }
  };

  //dodac loader

  useEffect(() => {
    fetchData(type);
  }, [type]);

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
              description={car.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
