'use client';
import { useState } from 'react';
import axios from 'axios';
import '../ui/login/login.css';

const initialLoginFormData = {
  email: '',
  password: '',
};

const initialRegisterFormData = {
  name: '',
  email: '',
  password: '',
};

const Login = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [formData, setFormData] = useState(initialLoginFormData);

  const sendData = async (url) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.message);
    } else {
      const data = await res.json();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event, url) => {
    event.preventDefault();
    sendData(url);
  };

  const VisibilityHandler = (event) => {
    event.preventDefault();
    setIsHidden(!isHidden);
    setFormData(isHidden ? initialLoginFormData : initialRegisterFormData);
  };

  return (
    <div className='login-wrapper'>
      <div className='login-form'>
        <div className='login-container'>
          <form name='login' onSubmit={(event) => handleFormSubmit(event, '/api/auth/login')}>
            <span>Jesteś już użytkownikiem?</span>
            <div className={isHidden ? '' : 'hidden'}>
              <input type='email' placeholder='Adres e-mail' name='email' onChange={handleInputChange} />
              <input type='password' placeholder='Hasło' name='password' onChange={handleInputChange} />
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
            <form name='register' onSubmit={(event) => handleFormSubmit(event, '/api/auth/register')}>
              <input type='text' placeholder='Imię i naziwsko*' name='name' onChange={handleInputChange} />
              <input type='email' placeholder='Email*' name='email' onChange={handleInputChange} />
              <input type='password' placeholder='Hasło*' name='password' onChange={handleInputChange} />
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
};

export default Login;
