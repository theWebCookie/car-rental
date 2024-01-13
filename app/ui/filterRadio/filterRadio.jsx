'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './filterRadio.css';

export default function FilterRadio({ name, value, label }) {
  const [isChecked, setIsChecked] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const paramValue = searchParams.get(name);
    setIsChecked(paramValue === value);
  }, [searchParams, name, value]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='radio-box'>
      <label htmlFor={value}>
        <input type='radio' name={name} value={value} id={value} checked={isChecked} onChange={(event) => handleInputChange(event)} />
        {label}
      </label>
    </div>
  );
}
