import { useState, useMemo } from 'react';

export default function useFilteredCars(cars) {
  const [currentFilter, setCurrentFilter] = useState('');

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredCars = useMemo(() => {
    if (!currentFilter) {
      return cars;
    }
    return cars.filter((car) => car.carType === currentFilter);
  }, [currentFilter, cars]);
  return { filteredCars, handleFilter, currentFilter };
}
