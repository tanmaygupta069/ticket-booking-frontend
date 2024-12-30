import axios from "axios";

const API_BASE_URL = "http://localhost:8081/auth"; // Replace with your server URL

export const getSeats = async () => {
  const response = await axios.get(`${API_BASE_URL}/getSeats`);
  return response.data;
};

export const bookSeats = async (numSeats) => {
  const response = await axios.post(`${API_BASE_URL}/book`, {
    numOfSeats: numSeats,
  });
  console.log("book seats",response.message);
  return response.data;
};

export const resetSeats = async () => {
  const response = await axios.post(`${API_BASE_URL}/reset`);
  return response.data;
};
