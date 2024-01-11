import React from 'react';
import FilterRadio from '../../filterRadio/filterRadio';
import './filterContainer.css';

export default function FilterContainer() {
  const carTypes = ['Osobowe', 'Van', 'Dostawcze'];
  const transmissions = ['Manualna', 'Automatyczna'];
  const priceOrders = ['Rosnąco', 'Malejąco'];
  const carTypeValues = ['car', 'van', 'truck'];
  const transmissionValues = ['manual', 'automat'];
  const priceOrderValues = ['asc', 'dsc'];

  return (
    <>
      <div className='filters'>
        <div>
          <span className='filter-type'>Typ pojazdu</span>
          {carTypes.map((carType, index) => (
            <FilterRadio key={index} name='carType' value={carTypeValues[index]} label={carType} />
          ))}
        </div>
        <div>
          <span className='filter-type'>Skrzynia biegów</span>
          {transmissions.map((transmission, index) => (
            <FilterRadio key={index} name='transmission' value={transmissionValues[index]} label={transmission} />
          ))}
        </div>
        <div>
          <span className='filter-type'>Cena</span>
          {priceOrders.map((priceOrder, index) => (
            <FilterRadio key={index} name='priceOrder' value={priceOrderValues[index]} label={priceOrder} />
          ))}
        </div>
      </div>
    </>
  );
}
