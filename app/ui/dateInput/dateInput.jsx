import React from 'react';
import './dateInput.css';

export default function DateInput({ inputType, label, value, onChange }) {
  const handleInputChange = (event) => {
    const selectedDate = event.target.value;
    onChange(selectedDate);
  };

  return (
    <div className='input-wrapper'>
      <label htmlFor={inputType}>{label}</label>
      <input type='date' id={inputType} name={inputType} value={value} onChange={(event) => handleInputChange(event)} />
    </div>
  );
}
