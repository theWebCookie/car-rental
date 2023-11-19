import Image from 'next/image';
import './car.css';

export default function Car({ src, alt, title, fuel, transmission, fuelUsage, luggage, doors, seats }) {
  return (
    <div className='car'>
      <div className='car-image'>
        <Image src={src} width={300} height={98} alt={alt} />
      </div>
      <div className='car-info'>
        <div className='car-info-wrapper'>
          <div>
            <span>{title}</span>
          </div>
          <div className='info'>
            <div>
              <Image src='/car/fuel.svg' width={16} height={16} alt='fuel' /> {fuel}
            </div>
            <div>
              <Image src='/car/transmission.svg' width={16} height={16} alt='transmission' /> {transmission}
            </div>
            <div>
              <Image src='/car/speed.svg' width={16} height={16} alt='speed' /> [l/100km]: {fuelUsage}l
            </div>
            <div>
              <Image src='/car/luggage.svg' width={16} height={16} alt='luggage' /> {luggage}
            </div>
            <div>
              <Image src='/car/doors.svg' width={16} height={16} alt='doors' /> {doors}
            </div>
            <div>
              <Image src='/car/seats.svg' width={16} height={16} alt='seats' /> {seats}
            </div>
          </div>
          <button>WIĘCEJ</button>
        </div>
      </div>
    </div>
  );
}
