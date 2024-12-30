import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SeatGrid from './components/SeatGrid';
import BookingForm from './components/bookingForm';
import ResetButton from './components/resetButton';
import { getSeats, bookSeats, resetSeats } from './services/api';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Seatbooking from './pages/Seatbooking';
import './index.css';

// const SeatBooking = () => {
//   const [seats, setSeats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSeats = async () => {
//     setLoading(true);
//     try {
//       const seatData = await getSeats();
//       setSeats(seatData);
//     } catch (error) {
//       console.error('Error fetching seats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   const handleReset = async () => {
//     try {
//       await resetSeats();
//       alert('All bookings have been reset.');
//       fetchSeats();
//     } catch (error) {
//       alert('Failed to reset bookings.');
//       console.error('Error resetting bookings:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSeats();
//   }, []);

//   return (
//     <div className="app">
//       <h2>Seat Booking</h2>
//       {loading ? (
//         <p>Please wait...</p>
//       ) : (
//         <div className="formCtn">
//           <SeatGrid seats={seats} />
//           <div className="form">
//             <BookingForm onBook={handleBooking} />
//             <ResetButton onReset={handleReset} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/seat-booking"
          element={isAuthenticated() ? <Seatbooking /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
