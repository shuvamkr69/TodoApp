import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Backend server URL
  withCredentials: true, // Allows cookies to be sent
});

export default api;
