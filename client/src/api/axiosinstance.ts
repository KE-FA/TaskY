import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tasky-xgkg.onrender.com",
  withCredentials: true,
});

export default axiosInstance;