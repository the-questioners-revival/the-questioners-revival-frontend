import React, { useRef, useState } from 'react';
import { Input } from '@chakra-ui/react';

const MinimalDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = () => {
    inputRef.current?.showPicker(); // Ensures the date picker opens when clicking on the input
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <Input
    width={200}
    borderWidth={1.5}
      ref={inputRef}
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
      placeholder="Select date"
      onClick={handleInputClick}
    />
  );
};

export default MinimalDatePicker;
