import Image from 'next/image';
import './hero.css';
import InputContainer from '../../reservationInputs/inputs/inputContainer';
import Button from '../../button/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className='hero'>
      <div className='hero-search'>
        <ul>
          <li>
            <span>
              <i className='fa-solid fa-check'></i> Bezpłatne anulowanie rezerwacji
            </span>
          </li>
          <li>
            <span>
              <i className='fa-solid fa-check'></i> Ponad 35 oddziałow w całej Polsce
            </span>
          </li>
          <li>
            <span>
              <i className='fa-solid fa-check'></i> W ofercie ponad 2700 nowych aut
            </span>
          </li>
        </ul>
        <div className='hero-inputs'>
          <div>
            <label htmlFor='city'>Miasto</label>
            <input type='text' id='city' name='city' />
          </div>
          <InputContainer />
          <div>
            <Button text='Wyszukaj' />
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
