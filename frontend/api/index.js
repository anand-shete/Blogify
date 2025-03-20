import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_RENDER_API,
  withCredentials: true,
});
console.log("baseURL", baseURL);

export default api;
