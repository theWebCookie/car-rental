'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { removeCookies, getCookies } from '@/app/lib/cookies';

export default function NavLinks() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authCookies, setAuthCookies] = useState([]);
  const pathname = usePathname();

  const handleNavBarClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    const getAuthCookies = async () => {
      const cookies = await getCookies();
      setAuthCookies(cookies);
    };
    getAuthCookies();
  }, [pathname]);

  const handleSignOut = async () => {
    removeCookies();
  };
  return (
    <>
      <div>
        <Link href='/' className='nav-logo'>
          <span>CAR</span>
          <span>RENT</span>
        </Link>
      </div>
      <div className={isMobileMenuOpen ? 'mobile open' : 'mobile close'}>
        <div>
          <Link href='/' className='nav-logo'>
            <span>CAR</span>
            <span>RENT</span>
          </Link>
        </div>
        <Link href='/reservation' className='nav-link'>
          Rezerwacja
        </Link>
        <Link href='/fleet' className='nav-link'>
          Flota
        </Link>
        <Link href='/login' className='nav-link'>
          <i className='fa-regular fa-user' style={{ color: '#74d7fe' }} aria-hidden />
        </Link>
      </div>
      <div className='menu'>
        <Link href='/reservation' className='nav-link'>
          Rezerwacja
        </Link>
        <Link href='/fleet' className='nav-link'>
          Flota
        </Link>
        <Link href={authCookies.length > 0 ? '/account' : '/login'} className='nav-link'>
          <i className='fa-regular fa-user' style={{ color: '#74d7fe' }} aria-hidden />
        </Link>
        {authCookies.length > 0 ? (
          <Link href='/login' className='nav-link'>
            <i className='fas fa-sign-out-alt' style={{ color: '#74d7fe' }} aria-hidden onClick={handleSignOut}></i>
          </Link>
        ) : null}
      </div>
      {isMobileMenuOpen ? (
        <i className='fa-solid fa-x x' onClick={handleNavBarClick} aria-hidden />
      ) : (
        <i className='fa-solid fa-bars bars' onClick={handleNavBarClick} aria-hidden />
      )}
    </>
  );
}
