'use client';
import { useState } from 'react';
import '../ui/login/login.css';

export default function Login() {
  const [isHidden, setIsHidden] = useState(true);

  const VisibilityHandler = (event) => {
    setIsHidden(!isHidden);
    event.preventDefault();
  };

  return (
    <div className='login-wrapper'>
      <div className='login-form'>
        <div className='login-container'>
          <form>
            <span>Jesteś już użytkownikiem?</span>
            <div className={isHidden ? '' : 'hidden'}>
              <input type='email' placeholder='Adres e-mail' />
              <input type='password' placeholder='Hasło' />
            </div>
            <input type='submit' value='Zaloguj się' className={isHidden ? '' : 'hidden'} />
            <button onClick={VisibilityHandler} className={isHidden ? 'login-btn hidden' : 'login-btn'}>
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
      <div className='register-wrapper'>
        <div className='wrapper'>
          <span className='heading'>Dołącz do CarRent!</span>
          <div className='list'>
            <span>Z kontem klienta:</span>
            <ul>
              <li>
                <i className='fa-solid fa-check'></i> rezerwujesz samochody jeszcze szybciej
              </li>
              <li>
                <i className='fa-solid fa-check'></i> łatwo zarządzasz swoimi danymi
              </li>
            </ul>
          </div>
          <div className={isHidden ? 'register-form hidden' : 'register-form'}>
            <form>
              <input type='text' placeholder='Imię i naziwsko*' />
              <input type='email' placeholder='Email*' />
              <input type='password' placeholder='Hasło*' />
              <input type='password' placeholder='Powtórz hasło*' />
              <span>* - pola obowiązkowe</span>
              <input type='submit' value='Załóż konto' />
            </form>
          </div>
          <button className={isHidden ? 'register-btn' : 'register-btn hidden'} onClick={VisibilityHandler}>
            Załóż konto
          </button>
        </div>
      </div>
    </div>
  );
}
