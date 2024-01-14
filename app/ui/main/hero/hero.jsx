'use client';
import Image from 'next/image';
import './hero.css';
import InputContainer from '../../reservationInputs/inputs/inputContainer';
import Button from '../../button/button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [searchParams, setSearchParams] = useState({
    city: '',
    startDate: '',
    endDate: '',
  });
  const router = useRouter();

  const handleDateChange = (inputType, value) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [inputType]: value,
    }));
  };

  const handleSearch = () => {
    router.push(`/reservation?city=${searchParams.city}&startDate=${searchParams.startDate}&endDate=${searchParams.endDate}`);
  };

  return (
    <div className='hero'>
      <div className='hero-search'>
        <ul>
          <li>
            <span>
              <i className='fa-solid fa-check' aria-hidden /> Bezpłatne anulowanie rezerwacji
            </span>
          </li>
          <li>
            <span>
              <i className='fa-solid fa-check' aria-hidden /> Ponad 35 oddziałow w całej Polsce
            </span>
          </li>
          <li>
            <span>
              <i className='fa-solid fa-check' aria-hidden /> W ofercie ponad 2700 nowych aut
            </span>
          </li>
        </ul>
        <div className='hero-inputs'>
          <div>
            <label htmlFor='city'>Miasto</label>
            <input
              type='text'
              id='city'
              name='city'
              value={searchParams.city}
              onChange={(e) => setSearchParams((prevSearchParams) => ({ ...prevSearchParams, city: e.target.value }))}
            />
          </div>
          <InputContainer onDateChange={handleDateChange} />
          <div>
            <Button text='Wyszukaj' onClick={handleSearch} />
          </div>
        </div>
      </div>
      <div className='hero-info'>
        <div className='hero-text'>
          <h1>Przedłuż swój weekend!</h1>
          <p>
            Odbierz samochód w <span>piątek</span> między <span>14:00 a 18:00</span> zwróc w <span>poniedziałek</span> między{' '}
            <span>8:00 a 10:00</span> i zapłać <span>tylko za 2 doby!</span>
          </p>
          <p className='hero-text-info'>Liczba samochodów ograniczona!</p>
          <Link href='/reservation' className='ui-btn'>
            Rezerwacja
          </Link>
        </div>
        <Image src='/main.png' alt='hero-car' width={750} height={421} priority={true} className='hero-img' />
      </div>
    </div>
  );
}
