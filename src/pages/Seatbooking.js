// import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/SeatGrid.css'; // Keep your preferred SeatGrid styling
import '../components/SeatGrid'
import './Seatbooking.css'
import SeatGrid from '../components/SeatGrid';
import React, { useEffect, useState } from "react";
import ResetButton from '../components/resetButton';
import { bookSeats ,getSeats,resetSeats} from '../services/api';




const SeatBooking = () => {

  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [numSeats, setNumSeats] = useState('');
  const [loading, setLoading] = useState(true);
  const [booked,setBooked] = useState([])


  const handleReset = async () => {
        try {
          await resetSeats();
          alert('All bookings have been reset.');
          fetchSeats();
        } catch (error) {
          alert('Failed to reset bookings.');
          console.error('Error resetting bookings:', error);
        }
      };


  const fetchSeats = async () => {
      setLoading(true);
      try {
        const seatData = await getSeats();
        setSeats(seatData.data);
        console.log("in fetch seat ",seatData);
      } catch (error) {
        console.error('Error fetching seats:', error);
      } finally {
        setLoading(false);
      }
    };

  const handleBooking = async (numSeats) => {
      try {
        const result = await bookSeats(numSeats);
        setBooked(result.data)
        alert(`Seats booked: ${result.data.map((seat) => seat.seatNumber).join(', ')}`);
        fetchSeats();
      } catch (error) {
        console.error('Error booking seats:', error);
        alert(error.response?.data?.message || 'An error occurred. Please try again.');
      }
    };


  useEffect(() => {
    fetch('http://localhost:8081/auth/getSeats')
      .then((response) => response.json())
      .then((data) => {
        const dataArray = data.data
        console.log('API response 123:', dataArray);
        setSeats(dataArray); // Ensure the data is an array
      })

      .catch((error) => console.error('Error fetching seats:', error));
  }, []);
  useEffect(()=>{
    let totalBookedSeats = 0;
    let totalAvailableSeats = 0;
    console.log("seats :",seats);
    for(let i = 0 ; i < seats.length ; i++){
      if(seats[i].isBooked){
        totalBookedSeats++;
      }
      else{
        totalAvailableSeats++;
      }
    }
    setAvailableSeats(totalAvailableSeats);
    setBookedSeats(totalBookedSeats);
  },[seats])

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="seat-booking-page">
      <div className="left">
        <h2>Ticket Booking</h2>
        <SeatGrid seats={seats}/> 
        <div className='left-child-1'>
            <div className='booked-seats'>
              Booked Seats : {bookedSeats}
            </div>
            <div className='available-seats'>
              Available Seats : {availableSeats}
            </div>
        </div>

      </div>
      <div className="right">
          <div className='book-seat'>
              <h2>
              Booked Seats
              </h2>
              <div className='booked-seats'>
              {booked.map((item,index)=>{return <div className='bookSeat'>{item.seatNumber}</div>})}
              </div>
          </div>
          <div className='input-div'>
          <input className='num-of-seats'
              type="number"
              min="1"
              max="10"
              placeholder="Enter number of seats"
              onChange={(e)=>{setNumSeats(e.target.value)}}
              value={numSeats}
              required
          />
          <button type="submit" className='book-button' onClick={()=>{handleBooking(numSeats)}}>Book</button>
          </div>
          <div>
          <button className="reset-button" onClick={handleReset}>
    Reset Booking
  </button>
          </div>
      </div>
    </div>
  );
};

export default SeatBooking;
