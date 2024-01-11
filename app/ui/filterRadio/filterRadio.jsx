'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './filterRadio.css';

export default function FilterRadio({ name, value, label }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = {
    carType: ['car', 'van', 'truck'],
    transmission: ['manual', 'automat'],
    priceOrder: ['asc', 'dsc'],
  };

  // useEffect(() => {
  //   const keys = Array.from(currentParams.keys());
  //   const values = Array.from(currentParams.values());

  //   console.log('Keys:', keys);
  //   console.log('Values:', values);
  // }, [currentParams]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
    
    // if (name === 'priceOrder') {
    //   //sort by price
    // }
  };

  return (
    <div className='radio-box'>
      <label htmlFor={value}>
        <input type='radio' name={name} value={value} id={value} onChange={(event) => handleInputChange(event)} />
        {label}
      </label>
    </div>
  );
}
