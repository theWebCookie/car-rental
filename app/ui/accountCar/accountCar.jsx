'use client';
import Image from 'next/image';
import './accountCar.css';
import Link from 'next/link';

export default function AccountCar({ car, info }) {
  const { imageUri, title, id } = car;
  const { startDate, endDate, price, options } = info;

  const optionsTable = [
    { id: 1, name: 'Fotelik dziecięcy - 9-36kg', price: 20 },
    { id: 2, name: 'Końcowe mycie pojazdu', price: 30 },
    { id: 3, name: 'Pomoc drogowa', price: 75 },
    { id: 4, name: 'Dodatkowe ubezpieczenie', price: 100 },
  ];

  const reservationOptions = optionsTable.filter((option) => options.split('').sort().includes(option.id.toString()));

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleDateString('pl-PL', options);
  };

  const checkStatus = (startDate, endDate) => {
    const currentDate = new Date();
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    if (currentDate >= startDateTime && currentDate <= endDateTime) {
      return 'W trakcie';
    } else if (startDateTime >= currentDate && currentDate <= endDateTime) {
      return 'Zaplanowana';
    } else {
      return 'Zakończona';
    }
  };

  return (
    <div className='resrvation-car'>
      <div className='car-wrapper'>
        <div className='car-info'>
          <div>
            <span className='car-title'>{title}</span>
          </div>
          <div className='car-image'>
            <Image src={imageUri} width={300} height={200} style={{ objectFit: 'contain' }} alt={title} />
          </div>
        </div>
        <div className='reservation-info'>
          <ol>
            <li>Data startu: {formatDateTime(startDate)}</li>
            <li>Data końca: {formatDateTime(endDate)}</li>
            <li>Cena: {price}zł</li>
            <li>
              Opcje:
              <ul className='options-list'>
                {reservationOptions.length > 0 ? (
                  reservationOptions.map((option) => <li key={option.id}>{option.name}</li>)
                ) : (
                  <li>Nie wybrano opcji</li>
                )}
              </ul>
            </li>
            <li>
              Status:{' '}
              <span
                style={{
                  color:
                    checkStatus(startDate, endDate) === 'W trakcie' ? 'green' : checkStatus(startDate, endDate) === 'Zaplanowana' ? 'grey' : 'red',
                }}
              >
                {checkStatus(startDate, endDate)}
              </span>
            </li>
          </ol>
        </div>
        <div className='account-car-info'>
          <Link href={`/fleet/${id}`}>WIĘCEJ</Link>
        </div>
      </div>
    </div>
  );
}
