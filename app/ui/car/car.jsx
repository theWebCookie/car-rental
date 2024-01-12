'use client';
import Image from 'next/image';
import './car.css';
import Link from 'next/link';

export default function Car({ src, alt, title, fuel, transmission, fuelUsage, luggage, doors, seats, id, description, price, extended }) {
  return (
    <div className='car'>
      <div className='car-image'>
        <Image src={src} width={300} height={200} style={{ objectFit: 'contain' }} alt={alt} />
      </div>
      <div className='car-info'>
        <div className='car-info-wrapper'>
          <div>
            <span>{title}</span>
          </div>
          <div className='info'>
            <div title='Typ paliwa'>
              <Image src='/car/fuel.svg' width={16} height={16} alt='fuel' /> {fuel}
            </div>
            <div title='Skrzynia biegów'>
              <Image src='/car/transmission.svg' width={16} height={16} alt='transmission' /> {transmission}
            </div>
            <div title='Zużycie paliwa'>
              <Image src='/car/speed.svg' width={16} height={16} alt='speed' /> [l/100km]: {fuelUsage}l
            </div>
            <div title='Pojemność bagażnika (litry)'>
              <Image src='/car/luggage.svg' width={16} height={16} alt='luggage' /> {luggage}l
            </div>
            <div title='Ilość drzwi'>
              <Image src='/car/doors.svg' width={16} height={16} alt='doors' /> {doors}
            </div>
            <div title='Ilość miejsc'>
              <Image src='/car/seats.svg' width={16} height={16} alt='seats' /> {seats}
            </div>
            <div>Cena: {price}zł/dzień</div>
          </div>
          <Link href={`/fleet/${id}`} className={extended ? 'hidden' : ''}>
            WIĘCEJ
          </Link>
        </div>
      </div>
      <div className={extended ? 'description' : 'description hidden'}>{description}</div>
    </div>
  );
}
