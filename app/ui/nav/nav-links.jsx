'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavLinks() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNavBarClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
        <Link href='/account' className='nav-link'>
          <i className='fa-regular fa-user' style={{ color: '#74d7fe' }}></i>
        </Link>
      </div>
      <div className='menu'>
        <Link href='/reservation' className='nav-link'>
          Rezerwacja
        </Link>
        <Link href='/fleet' className='nav-link'>
          Flota
        </Link>
        <Link href='/account' className='nav-link'>
          <i className='fa-regular fa-user' style={{ color: '#74d7fe' }}></i>
        </Link>
      </div>
      {isMobileMenuOpen ? (
        <i className='fa-solid fa-x x' onClick={handleNavBarClick}></i>
      ) : (
        <i className='fa-solid fa-bars bars' onClick={handleNavBarClick}></i>
      )}
    </>
  );
}
