import Image from 'next/image';
import './hero.css';

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
          <input type='date' name='' id='' />
          <input type='date' name='' id='' />
          <input type='date' name='' id='' />
          <button>WYSZUKAJ SAMOCHÓD</button>
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
          <button>ZAREZERWUJ</button>
        </div>
        <Image src='/main.png' alt='hero-car' width={750} height={421} priority={true} className='hero-img' />
      </div>
    </div>
  );
}
