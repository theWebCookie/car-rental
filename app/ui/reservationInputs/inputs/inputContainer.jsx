'use client';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import DateInput from '../../dateInput/dateInput';

export default function InputContainer({ onDateChange }) {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleUrlChange = (inputType, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(inputType, value);
    } else {
      params.delete(inputType);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleDateChange = (inputType, value) => {
    try {
      const selectedDate = new Date(value);

      if (selectedDate < new Date()) {
        throw new Error('Nie można wybrać przeszłej daty');
      }

      if (inputType === 'startDate') {
        if (dateRange.endDate && selectedDate > new Date(dateRange.endDate)) {
          throw new Error('Data początkowa nie może być po dacie końcowej');
        }

        setDateRange((prevDateRange) => ({
          ...prevDateRange,
          startDate: value,
        }));
        onDateChange('startDate', value);
        handleUrlChange(inputType, value);
      } else {
        if (dateRange.startDate && selectedDate < new Date(dateRange.startDate)) {
          throw new Error('Data końcowa nie może być przed datą początkową');
        }

        setDateRange((prevDateRange) => ({
          ...prevDateRange,
          endDate: value,
        }));
        onDateChange('endDate', value);
        handleUrlChange(inputType, value);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const startDateFromUrl = searchParams.get('startDate') || '';
    const endDateFromUrl = searchParams.get('endDate') || '';

    setDateRange({
      startDate: startDateFromUrl,
      endDate: endDateFromUrl,
    });
  }, [searchParams]);

  return (
    <>
      <DateInput inputType='start-date' label='Data odbioru' value={dateRange.startDate} onChange={(value) => handleDateChange('startDate', value)} />
      <DateInput inputType='end-date' label='Data zwrotu' value={dateRange.endDate} onChange={(value) => handleDateChange('endDate', value)} />
    </>
  );
}
