import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:8080",
});
export default axiosBase;
