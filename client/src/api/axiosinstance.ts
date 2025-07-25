import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tasky-xgkg.onrender.com",
  //  baseURL:"http://localhost:4000",
  withCredentials: true,
});

export default axiosInstance;
