import axios from "axios";

const axio = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5500/api",
  
});

export default axio;