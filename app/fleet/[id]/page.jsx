'use client';
import { useEffect, useState } from 'react';
import { fetchCarById } from '@/app/lib/fetchCars';
import Car from '@/app/ui/car/car';
import '@/app/ui/fleet/fleetIdCar.css';

export default function CarPage({ params }) {
  const [car, setCar] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      const fetchedCar = await fetchCarById(params.id);
      setCar(fetchedCar);
    };
    fetchCar();
  }, [params.id]);

  console.log(car);
  return <div className='car-page'>{car.length != 0 ? <Car car={car} extended cardType='reservation' /> : <p>Ładowanie...</p>}</div>;
}
