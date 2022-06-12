import axios from "axios";
const baseRequestURL = "https://api.themoviedb.org/3";
const axiosInstance = axios.create({
  baseURL:baseRequestURL
});
export default axiosInstance;