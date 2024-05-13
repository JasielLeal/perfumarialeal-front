import axios from "axios";

export const backend = axios.create({
  baseURL: "https://perfumarialeal-backend.vercel.app",
});

