import React, { useEffect, useState } from "react";
import "./SeatGrid.css";

const SeatGrid = ({ seats }) => {

  // Function to generate rows dynamically
  console.log(Array.isArray(seats));

  return <div className="seat-grid">
    {(seats).map((seat) => (
            <div
              key={`${seat.rowNumber}-${seat.seatNumber}`}
              className={`seat ${seat.isBooked ? "booked" : "available"}`}
            >
              {seat.seatNumber}
            </div>
          ))}
  </div>;
};

export default SeatGrid;
