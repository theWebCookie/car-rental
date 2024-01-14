'use client';
import { useState } from 'react';
import '../ui/login/login.css';
import Button from '../ui/button/button';
import Input from '../ui/input/input';

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
              <Input type='email' placeholder='Adres e-mail' name='email' onChange={handleInputChange} />
              <Input type='password' placeholder='Hasło' name='password' onChange={handleInputChange} />
            </div>
            <Button text='Zaloguj się' type='submit' className={isHidden ? '' : 'hidden'} />
            <Button text='Zaloguj się' className={isHidden ? 'login-btn hidden' : 'login-btn'} onClick={VisibilityHandler} />
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
              <div className='two-register-inputs'>
                <Input type='text' placeholder='Imię*' name='firstName' onChange={handleInputChange} />
                <Input type='text' placeholder='Naziwsko*' name='seccondName' onChange={handleInputChange} />
              </div>
              <Input type='email' placeholder='Email*' name='email' onChange={handleInputChange} />
              <Input type='password' placeholder='Hasło*' name='password' onChange={handleInputChange} />
              <Input type='password' placeholder='Powtórz hasło*' />
              <span>* - pola obowiązkowe</span>
              <Button text='Załóż konto' type='submit' />
            </form>
          </div>
          <Button text='Załóż konto' className={isHidden ? 'register-btn' : 'register-btn hidden'} onClick={VisibilityHandler} />
        </div>
      </div>
    </div>
  );
};

export default Login;
