import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api", // Update if deployed
  withCredentials: true,
});

export default instance;
