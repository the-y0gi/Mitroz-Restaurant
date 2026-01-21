import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Update if deployed
  withCredentials: true,
});

export default axiosInstance;
