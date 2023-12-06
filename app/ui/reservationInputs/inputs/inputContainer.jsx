'use client';
import React, { useState } from 'react';
import DateInput from '../../dateInput/dateInput';

export default function InputContainer() {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

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
      } else {
        if (dateRange.startDate && selectedDate < new Date(dateRange.startDate)) {
          throw new Error('Data końcowa nie może być przed datą początkową');
        }

        setDateRange((prevDateRange) => ({
          ...prevDateRange,
          endDate: value,
        }));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <DateInput inputType='start-date' label='Data odbioru' value={dateRange.startDate} onChange={(value) => handleDateChange('startDate', value)} />
      <DateInput inputType='end-date' label='Data zwrotu' value={dateRange.endDate} onChange={(value) => handleDateChange('endDate', value)} />
    </>
  );
}
