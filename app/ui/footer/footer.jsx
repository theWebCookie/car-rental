import Link from 'next/link';
import './footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-text'>
        <ul className='footer-info'>
          <li>
            <h4>CarRent</h4>
          </li>
          <li>CAR NET Polska sp. z o.o.</li>
          <li>ul. Pomorska 4</li>
          <li>12-345 Łódź</li>
          <li>Skontaktuj się z nami!</li>
          <li>
            wynajmy krótkoterminowe{' '}
            <p>
              <i className='fa-solid fa-phone'></i>+48 123 456 789
            </p>
          </li>
          <li>
            wynajmy średnioterminowe{' '}
            <p>
              <i className='fa-solid fa-phone'></i>+48 987 654 321
            </p>
          </li>
          <li>kontakt@carrent.pl</li>
        </ul>
        <ul className='footer-links'>
          <li>
            <Link href='/'>O firmie</Link>
          </li>
          <li>
            <Link href='/'>Blog... i wiesz więcej!</Link>
          </li>
          <li>
            <Link href='/'>Ogólne warunki najmu pojazdów</Link>
          </li>
          <li>
            <Link href='/'>Zakres ubezpieczeń OC/AC</Link>
          </li>
          <li>
            <Link href='/'>Klauzule informacyjne</Link>
          </li>
          <li>
            <Link href='/'>Polityka prywatności</Link>
          </li>
          <li>
            <Link href='/'>Reklamacja</Link>
          </li>
        </ul>
      </div>
      <div className='footer-media'>
        <div className='media'>
          <div>
            <Link href='/'>
              <i className='fa-brands fa-instagram'></i>
            </Link>
          </div>
          <div>
            <Link href='/'>
              <i className='fa-brands fa-facebook'></i>
            </Link>
          </div>
        </div>
        <div className='copy'>Copyright (c) Carrent.pl. All rights reserved.</div>
      </div>
    </footer>
  );
}
