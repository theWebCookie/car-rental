import React from 'react';
import FilterCheckbox from '../../filterCheckbox/filterCheckbox';
import './filterContainer.css';

export default function FilterContainer() {
  const carTypes = ['Osobowe', 'Van', 'Dostawcze'];
  const transmissions = ['Manualna', 'Automatyczna'];
  const priceOrders = ['Rosnąco', 'Malejąco'];

  return (
    <>
      <div className='filters'>
        <div>
          <span className='filter-type'>Typ pojazdu</span>
          {carTypes.map((carType, index) => (
            <FilterCheckbox key={index} name='carType' value={carType} label={carType} />
          ))}
        </div>
        <div>
          <span className='filter-type'>Skrzynia biegów</span>
          {transmissions.map((transmission, index) => (
            <FilterCheckbox key={index} name='transmission' value={transmission} label={transmission} />
          ))}
        </div>
        <div>
          <span className='filter-type'>Cena</span>
          {priceOrders.map((priceOrder, index) => (
            <FilterCheckbox key={index} name='priceOrder' value={priceOrder} label={priceOrder} />
          ))}
        </div>
      </div>
    </>
  );
}
