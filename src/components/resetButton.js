import React from 'react';

const ResetButton = ({ onReset }) => (
  <button className="reset-button" onClick={onReset}>
    Reset Booking
  </button>
);

export default ResetButton;
