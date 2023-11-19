import Image from 'next/image';
import Link from 'next/link';
import Car from '../ui/car/car';
import '../ui/fleet/fleet.css';

export default function Fleet() {
  const filters = [
    { id: 0, src: '/fleet/car.svg', alt: 'Osobowe', link: '/fleet/car' },
    { id: 1, src: '/fleet/carAutomat.svg', alt: 'Automat', link: '/fleet/automat' },
    { id: 2, src: '/fleet/carTruck.svg', alt: 'Dostawcze', link: '/fleet/truck' },
    { id: 3, src: '/fleet/carVan.svg', alt: 'Van', link: '/fleet/van' },
  ];

  const mockCars = [
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
      carType: 'osobowe',
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
      carType: 'automat',
    },
  ];

  return (
    <div className='fleet'>
      <div className='fleet-wrapper'>
        <div className='fleet-filters'>
          {filters.map((filter) => (
            <div key={filter.id} className='cars-element'>
              <Image src={filter.src} width={80} height={32} alt={filter.alt} />
              <Link href={filter.link}>{filter.alt}</Link>
            </div>
          ))}
        </div>
        <div className='fleet-cars'>
          {mockCars.map((car) => (
            <Car
              key={car.id}
              src={car.src}
              title={car.title}
              fuel={car.fuel}
              transmission={car.transmission}
              fuelUsage={car.fuelUsage}
              luggage={car.luggage}
              doors={car.doors}
              seats={car.doors}
              alt={car.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
