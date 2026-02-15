import axios from "axios";

const api = axios.create({
  baseURL: "https://pteahbay-api.cheatdev.online",
  timeout: 20000,
});

export default api;
