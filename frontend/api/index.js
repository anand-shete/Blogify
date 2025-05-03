import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});
console.log("baseURL", baseURL);

export default api;
