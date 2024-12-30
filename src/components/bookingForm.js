import React, { useState } from 'react';

const BookingForm = ({ onBook }) => {
  const [numSeats, setNumSeats] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(numSeats);
    setNumSeats('');
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <input
        type="number"
        min="1"
        max="10"
        value={numSeats}
        onChange={(e) => setNumSeats(e.target.value)}
        placeholder="Enter number of seats"
        required
      />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;
