'use client';
import { useState } from 'react';
import Image from 'next/image';
import './car-section.css';
import Link from 'next/link';

export default function CarSection() {
  const cars = [
    { id: 0, src: '/Car.webp', alt: 'Osobowe', link: '/reservation' },
    { id: 1, src: '/CarAutomat.webp', alt: 'Automat', link: '/reservation' },
    { id: 2, src: '/CarTruck.webp', alt: 'Dostawcze', link: '/reservation' },
    { id: 3, src: '/CarVan.webp', alt: 'Van', link: '/reservation' },
  ];

  return (
    <section className='car-section'>
      <div className='car-text'>
        <h3>Znajdź samochód dla siebie!</h3>
        <p>Ponad 2700 nowych, bogato wyposażonych pojazdów osobowych i dostawczych do wyboru.</p>
      </div>
      <div className='cars'>
        {cars.map((car) => (
          <div key={car.id} className='cars-element'>
            <Image src={car.src} width={275} height={103} alt={car.alt} />
            <Link href={car.link}>{car.alt}</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
